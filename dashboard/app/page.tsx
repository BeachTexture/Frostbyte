'use client';

import { Header } from '@/components/Header';
import { StatsCards } from '@/components/StatsCards';
import { ActivityFeed } from '@/components/ActivityFeed';
import { WalletBalances } from '@/components/WalletBalances';
import { DistributionChart } from '@/components/DistributionChart';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useStats } from '@/hooks/useStats';

export default function Dashboard() {
  const { isConnected, events } = useWebSocket();
  const { stats, wallets, loading, error } = useStats();

  return (
    <div className="min-h-screen bg-night-sky">
      <Header isConnected={isConnected} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400 text-sm">
              <span>&#9888;&#65039;</span> {error}
            </p>
          </div>
        )}

        {/* Stats Cards */}
        <section className="mb-8">
          <StatsCards stats={stats} loading={loading} />
        </section>

        {/* Middle Row: Chart + Wallets */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DistributionChart />
          <WalletBalances wallets={wallets} loading={loading} />
        </section>

        {/* Activity Feed */}
        <section>
          <ActivityFeed events={events} />
        </section>

        {/* Footer Status */}
        <footer className="mt-8 text-center text-sm text-slate-500">
          <p>
            Bot Status:{' '}
            <span
              className={
                stats?.status?.isRunning ? 'text-green-400' : 'text-red-400'
              }
            >
              {stats?.status?.isRunning
                ? stats?.status?.isPaused
                  ? 'Paused'
                  : 'Running'
                : 'Stopped'}
            </span>
            {stats?.status?.startTime && (
              <span className="ml-4">
                Started: {new Date(stats.status.startTime).toLocaleString()}
              </span>
            )}
          </p>
        </footer>
      </main>
    </div>
  );
}
