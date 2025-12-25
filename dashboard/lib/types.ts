// Stats types matching backend API
export interface FeeStats {
  totalCollected: number;
  claimCount: number;
  lastClaimTime: string | null;
  lastClaimAmount: number;
}

export interface VolumeStats {
  totalVolume: number;
  tradeCount: number;
  successfulTrades: number;
  failedTrades: number;
  lastTradeTime: string | null;
}

export interface BurnStats {
  totalBurned: number;
  totalSolSpent: number;
  burnCount: number;
  lastBurnTime: string | null;
}

export interface AirdropStats {
  totalDistributed: number;
  distributionCount: number;
  uniqueRecipients: number;
  lastDistributionTime: string | null;
}

export interface TreasuryStats {
  totalReceived: number;
  transferCount: number;
  lastTransferTime: string | null;
}

export interface BotStatus {
  isRunning: boolean;
  isPaused: boolean;
  startTime: string | null;
  modules: {
    feeCollector: boolean;
    volumeCreator: boolean;
    buybackBurner: boolean;
    airdropDistributor: boolean;
  };
}

export interface ComprehensiveStats {
  fees: FeeStats;
  volume: VolumeStats;
  burns: BurnStats;
  airdrops: AirdropStats;
  treasury: TreasuryStats;
  distribution: {
    volume: string;
    buyback: string;
    airdrop: string;
    treasury: string;
  };
  status: BotStatus;
}

export interface WalletData {
  master: {
    address: string;
    balance: number;
    label: string;
  };
  reindeer: {
    volume: {
      label: string;
      emoji: string;
      totalBalance: number;
      wallets: Array<{ address: string; balance: number }>;
    };
    buyback: {
      label: string;
      emoji: string;
      address: string;
      balance: number;
    };
    airdrop: {
      label: string;
      emoji: string;
      address: string;
      balance: number;
      note?: string;
    };
    treasury: {
      label: string;
      emoji: string;
      address: string;
      balance: number;
    };
  };
}

// WebSocket event types
export type WSEventType =
  | 'fee_collected'
  | 'burn'
  | 'airdrop'
  | 'volume'
  | 'treasury'
  | 'error'
  | 'stats'
  | 'connected';

export interface WSMessage {
  type: WSEventType;
  data: Record<string, unknown>;
  timestamp: string;
}

export interface ActivityEvent {
  id: string;
  type: WSEventType;
  message: string;
  timestamp: Date;
  data?: Record<string, unknown>;
}
