'use client';

interface HeaderProps {
  isConnected: boolean;
}

export function Header({ isConnected }: HeaderProps) {
  return (
    <header className="bg-slate-800/50 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-3xl">&#129420;</span>
          <h1 className="text-2xl font-bold text-snow-white">
            4Reindeer Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-green-500 pulse' : 'bg-red-500'
            }`}
          />
          <span className="text-sm text-slate-400">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
    </header>
  );
}
