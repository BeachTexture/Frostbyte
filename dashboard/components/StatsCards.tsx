'use client';

import { ComprehensiveStats } from '@/lib/types';

interface StatsCardsProps {
  stats: ComprehensiveStats | null;
  loading: boolean;
}

interface StatCardProps {
  emoji: string;
  title: string;
  mainValue: string;
  mainLabel: string;
  secondaryValue: string;
  secondaryLabel: string;
  color: string;
}

function StatCard({
  emoji,
  title,
  mainValue,
  mainLabel,
  secondaryValue,
  secondaryLabel,
  color,
}: StatCardProps) {
  return (
    <div className={`bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-${color}-500/50 transition-colors`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{emoji}</span>
        <h3 className="font-semibold text-slate-300">{title}</h3>
      </div>
      <div className="space-y-2">
        <div>
          <p className={`text-2xl font-bold text-${color}-400`}>{mainValue}</p>
          <p className="text-xs text-slate-500">{mainLabel}</p>
        </div>
        <div className="pt-2 border-t border-slate-700/50">
          <p className="text-lg font-semibold text-slate-300">{secondaryValue}</p>
          <p className="text-xs text-slate-500">{secondaryLabel}</p>
        </div>
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 animate-pulse">
      <div className="h-8 bg-slate-700 rounded w-24 mb-3" />
      <div className="h-8 bg-slate-700 rounded w-32 mb-2" />
      <div className="h-4 bg-slate-700 rounded w-20" />
    </div>
  );
}

export function StatsCards({ stats, loading }: StatsCardsProps) {
  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  // Safe accessors with defaults
  const fees = stats.fees || { totalCollected: 0, claimCount: 0 };
  const volume = stats.volume || { totalVolume: 0, tradeCount: 0 };
  const burns = stats.burns || { totalBurned: 0, burnCount: 0 };
  const airdrops = stats.airdrops || { uniqueRecipients: 0, distributionCount: 0 };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        emoji="&#127877;"
        title="SANTA"
        mainValue={`${(fees.totalCollected || 0).toFixed(4)} SOL`}
        mainLabel="Total Collected"
        secondaryValue={(fees.claimCount || 0).toString()}
        secondaryLabel="Claims"
        color="red"
      />
      <StatCard
        emoji="&#10052;&#65039;"
        title="VOLUME"
        mainValue={`${(volume.totalVolume || 0).toFixed(4)} SOL`}
        mainLabel="Total Volume"
        secondaryValue={(volume.tradeCount || 0).toString()}
        secondaryLabel="Trades"
        color="blue"
      />
      <StatCard
        emoji="&#128293;"
        title="BURN"
        mainValue={`${(burns.totalBurned || 0).toLocaleString()}`}
        mainLabel="Tokens Burned"
        secondaryValue={(burns.burnCount || 0).toString()}
        secondaryLabel="Burns"
        color="orange"
      />
      <StatCard
        emoji="&#129666;"
        title="AIRDROP"
        mainValue={(airdrops.uniqueRecipients || 0).toString()}
        mainLabel="Unique Recipients"
        secondaryValue={(airdrops.distributionCount || 0).toString()}
        secondaryLabel="Distributions"
        color="purple"
      />
    </div>
  );
}
