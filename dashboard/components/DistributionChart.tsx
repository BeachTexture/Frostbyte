'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Volume', value: 25, color: '#60a5fa' },
  { name: 'Buyback', value: 25, color: '#fb923c' },
  { name: 'Airdrop', value: 25, color: '#a78bfa' },
  { name: 'Treasury', value: 25, color: '#fbbf24' },
];

export function DistributionChart() {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-700">
        <h3 className="font-semibold text-slate-300 flex items-center gap-2">
          <span>&#128200;</span>
          Fee Distribution
        </h3>
      </div>

      <div className="p-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
              }}
              itemStyle={{ color: '#f8fafc' }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              formatter={(value) => <span style={{ color: '#94a3b8' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
