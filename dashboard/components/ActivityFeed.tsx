'use client';

import { ActivityEvent, WSEventType } from '@/lib/types';

interface ActivityFeedProps {
  events: ActivityEvent[];
}

function getEventIcon(type: WSEventType): string {
  switch (type) {
    case 'fee_collected':
      return '\u{1F385}'; // Santa
    case 'volume':
      return '\u2744\uFE0F'; // Snowflake
    case 'burn':
      return '\u{1F525}'; // Fire
    case 'airdrop':
      return '\u{1FA82}'; // Parachute
    case 'treasury':
      return '\u{1F3E6}'; // Bank
    case 'error':
      return '\u26A0\uFE0F'; // Warning
    case 'connected':
      return '\u2705'; // Check
    default:
      return '\u{1F4E1}'; // Satellite
  }
}

function getEventColor(type: WSEventType): string {
  switch (type) {
    case 'fee_collected':
      return 'text-red-400';
    case 'volume':
      return 'text-blue-400';
    case 'burn':
      return 'text-orange-400';
    case 'airdrop':
      return 'text-purple-400';
    case 'treasury':
      return 'text-yellow-400';
    case 'error':
      return 'text-red-500';
    default:
      return 'text-slate-400';
  }
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function ActivityFeed({ events }: ActivityFeedProps) {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-700">
        <h3 className="font-semibold text-slate-300 flex items-center gap-2">
          <span>&#128226;</span>
          Live Activity Feed
          {events.length > 0 && (
            <span className="text-xs bg-slate-700 px-2 py-0.5 rounded-full">
              {events.length}
            </span>
          )}
        </h3>
      </div>

      <div className="h-64 overflow-y-auto">
        {events.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500">
            <p>Waiting for events...</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700/50">
            {events.map((event) => (
              <div
                key={event.id}
                className="activity-item px-5 py-3 hover:bg-slate-700/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg">{getEventIcon(event.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`${getEventColor(event.type)} text-sm`}>
                      {event.message}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {formatTime(event.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
