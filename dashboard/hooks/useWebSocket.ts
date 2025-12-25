'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { WSMessage, ActivityEvent, WSEventType } from '@/lib/types';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000';

function formatEventMessage(type: WSEventType, data: Record<string, unknown>): string {
  switch (type) {
    case 'fee_collected':
      return `Fee collected: ${(data.amount as number)?.toFixed(4)} SOL`;
    case 'volume':
      return `Volume trade: ${(data.amount as number)?.toFixed(4)} SOL`;
    case 'burn':
      return `Burned ${(data.tokens as number)?.toLocaleString()} tokens (${(data.sol as number)?.toFixed(4)} SOL)`;
    case 'airdrop':
      return `Airdrop: ${(data.amount as number)?.toLocaleString()} to ${data.recipients} holders`;
    case 'treasury':
      return `Treasury transfer: ${(data.amount as number)?.toFixed(4)} SOL`;
    case 'error':
      return `Error: ${data.message}`;
    case 'connected':
      return 'Connected to server';
    case 'stats':
      return 'Stats updated';
    default:
      return `Event: ${type}`;
  }
}

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [lastStats, setLastStats] = useState<Record<string, unknown> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    try {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        console.log('WebSocket connected');
      };

      ws.onmessage = (event) => {
        try {
          const message: WSMessage = JSON.parse(event.data);

          // Handle stats updates separately
          if (message.type === 'stats') {
            setLastStats(message.data);
            return;
          }

          // Add to activity feed
          const activityEvent: ActivityEvent = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: message.type,
            message: formatEventMessage(message.type, message.data),
            timestamp: new Date(message.timestamp),
            data: message.data,
          };

          setEvents((prev) => [activityEvent, ...prev].slice(0, 50)); // Keep last 50 events
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        console.log('WebSocket disconnected, reconnecting in 3s...');

        // Auto-reconnect after 3 seconds
        reconnectTimeoutRef.current = setTimeout(connect, 3000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (err) {
      console.error('Failed to create WebSocket:', err);
      reconnectTimeoutRef.current = setTimeout(connect, 3000);
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return {
    isConnected,
    events,
    lastStats,
  };
}
