import { ComprehensiveStats, WalletData } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const json: ApiResponse<T> = await response.json();

  if (!json.success) {
    throw new Error('API returned unsuccessful response');
  }

  return json.data;
}

export async function getStats(): Promise<ComprehensiveStats> {
  return fetchApi<ComprehensiveStats>('/stats');
}

export async function getWallets(): Promise<WalletData> {
  return fetchApi<WalletData>('/wallets');
}

export async function getHealth(): Promise<{ status: string; uptime: number }> {
  const response = await fetch(`${API_URL}/health`);
  return response.json();
}
