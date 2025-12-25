'use client';

import { WalletData } from '@/lib/types';

interface WalletBalancesProps {
  wallets: WalletData | null;
  loading: boolean;
}

interface WalletRowProps {
  emoji: string;
  label: string;
  balance: number;
  address?: string;
}

function WalletRow({ emoji, label, balance, address }: WalletRowProps) {
  const shortAddress = address
    ? `${address.slice(0, 4)}...${address.slice(-4)}`
    : null;

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <span>{emoji}</span>
        <span className="text-slate-300">{label}</span>
        {shortAddress && (
          <span className="text-xs text-slate-500 font-mono">{shortAddress}</span>
        )}
      </div>
      <span className="font-mono text-green-400">{(balance || 0).toFixed(4)} SOL</span>
    </div>
  );
}

export function WalletBalances({ wallets, loading }: WalletBalancesProps) {
  if (loading) {
    return (
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-5 animate-pulse">
        <div className="h-6 bg-slate-700 rounded w-40 mb-4" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 bg-slate-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!wallets) {
    return (
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-5">
        <p className="text-slate-500">Failed to load wallet data</p>
      </div>
    );
  }

  // Safe accessors
  const master = wallets.master || { balance: 0, address: '' };
  const reindeer = wallets.reindeer || {};
  const volume = reindeer.volume || { emoji: '\u2744\uFE0F', totalBalance: 0 };
  const buyback = reindeer.buyback || { emoji: '\u{1F525}', balance: 0, address: '' };
  const treasury = reindeer.treasury || { emoji: '\u{1F3E6}', balance: 0, address: '' };

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-700">
        <h3 className="font-semibold text-slate-300 flex items-center gap-2">
          <span>&#128176;</span>
          Wallet Balances
        </h3>
      </div>

      <div className="px-5 py-3 divide-y divide-slate-700/50">
        <WalletRow
          emoji="&#127877;"
          label="Master"
          balance={master.balance}
          address={master.address}
        />
        <WalletRow
          emoji={volume.emoji || '\u2744\uFE0F'}
          label="Volume"
          balance={volume.totalBalance || 0}
        />
        <WalletRow
          emoji={buyback.emoji || '\u{1F525}'}
          label="Buyback"
          balance={buyback.balance || 0}
          address={buyback.address}
        />
        <WalletRow
          emoji={treasury.emoji || '\u{1F3E6}'}
          label="Treasury"
          balance={treasury.balance || 0}
          address={treasury.address}
        />
      </div>
    </div>
  );
}
