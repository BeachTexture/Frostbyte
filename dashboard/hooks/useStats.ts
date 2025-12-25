'use client';

import { useState, useEffect, useCallback } from 'react';
import { ComprehensiveStats, WalletData } from '@/lib/types';
import { getStats, getWallets } from '@/lib/api';

const POLL_INTERVAL = 10000; // 10 seconds

export function useStats() {
  const [stats, setStats] = useState<ComprehensiveStats | null>(null);
  const [wallets, setWallets] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [statsData, walletsData] = await Promise.all([
        getStats(),
        getWallets(),
      ]);
      setStats(statsData);
      setWallets(walletsData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    stats,
    wallets,
    loading,
    error,
    refetch: fetchData,
  };
}
