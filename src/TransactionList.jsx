import { useState, useMemo } from 'react'
import { CATEGORIES } from './constants'

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const filtered = useMemo(() => {
    let result = transactions;
    if (filterType !== "all") result = result.filter(t => t.type === filterType);
    if (filterCategory !== "all") result = result.filter(t => t.category === filterCategory);
    return result;
  }, [transactions, filterType, filterCategory]);

  return (
    <div className="transactions">
      <div className="transactions-header">
        <h2 className="section-title">Transactions</h2>
        <div className="filters">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', color: 'var(--muted)', padding: '32px' }}>
                No transactions found.
              </td>
            </tr>
          ) : filtered.map(t => (
            <tr key={t.id}>
              <td className="td-date">{t.date}</td>
              <td>{t.description}</td>
              <td><span className="category-pill">{t.category}</span></td>
              <td className={`td-amount ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString('en-US')}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => { if (confirm('Delete this transaction?')) onDelete(t.id); }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
