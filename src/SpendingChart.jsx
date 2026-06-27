import { useMemo } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'];

function SpendingChart({ transactions }) {
  const data = useMemo(() => {
    const categoryMap = {};
    for (const t of transactions.filter(t => t.type === 'expense')) {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  if (data.length === 0) {
    return (
      <div className="spending-chart">
        <h2 className="section-title">Spending by Category</h2>
        <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '48px 0', fontSize: '14px' }}>
          No expenses to chart yet.
        </p>
      </div>
    );
  }

  return (
    <div className="spending-chart">
      <h2 className="section-title">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'Inter, sans-serif' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'Inter, sans-serif' }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            formatter={(value) => [`$${value.toLocaleString('en-US')}`, 'Amount']}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
            }}
            cursor={{ fill: 'rgba(0,0,0,0.03)' }}
          />
          <Bar dataKey="value" radius={[5, 5, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
