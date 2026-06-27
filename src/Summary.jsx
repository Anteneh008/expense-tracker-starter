import { useMemo } from 'react';

function Summary({ transactions }) {
  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
  }, [transactions]);

  return (
    <div className="summary">
      <div className="summary-card">
        <h3>Income</h3>
        <p className="income-amount">${totalIncome.toLocaleString('en-US')}</p>
      </div>
      <div className="summary-card">
        <h3>Expenses</h3>
        <p className="expense-amount">${totalExpenses.toLocaleString('en-US')}</p>
      </div>
      <div className="summary-card balance">
        <h3>Balance</h3>
        <p className="balance-amount">${balance.toLocaleString('en-US')}</p>
      </div>
    </div>
  );
}

export default Summary;
