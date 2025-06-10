// utils/settlementCalculator.js

/**
 * Calculate how much each person owes or is owed
 */
function calculateBalances(expenses) {
    const balances = {};
  
    expenses.forEach(exp => {
      const { amount, paid_by, participants, split_type, split_values } = exp;
      const numPeople = participants.length;
  
      // Credit paid_by
      balances[paid_by] = (balances[paid_by] || 0) + amount;
  
      // Debit each participant
      if (split_type === 'equal') {
        const share = amount / numPeople;
        participants.forEach(p => {
          balances[p] = (balances[p] || 0) - share;
        });
      } else if (split_type === 'exact') {
        participants.forEach(p => {
          const share = split_values[p] || 0;
          balances[p] = (balances[p] || 0) - share;
        });
      } else if (split_type === 'percentage') {
        participants.forEach(p => {
          const percent = split_values[p] || 0;
          const share = (percent / 100) * amount;
          balances[p] = (balances[p] || 0) - share;
        });
      }
    });
  
    // Round all balances to 2 decimal places
    for (const person in balances) {
      balances[person] = parseFloat(balances[person].toFixed(2));
    }
  
    return balances;
  }
  
  /**
   * Minimize number of transactions to settle debts
   */
  function minimizeTransactions(balances) {
    const result = [];
  
    const positive = [], negative = [];
  
    for (const person in balances) {
      const amount = balances[person];
      if (amount > 0) {
        positive.push({ person, amount });
      } else if (amount < 0) {
        negative.push({ person, amount: -amount }); // convert to positive
      }
    }
  
    let i = 0, j = 0;
  
    while (i < positive.length && j < negative.length) {
      const credit = positive[i];
      const debit = negative[j];
  
      const minAmount = Math.min(credit.amount, debit.amount);
  
      result.push({
        from: debit.person,
        to: credit.person,
        amount: parseFloat(minAmount.toFixed(2))
      });
  
      credit.amount -= minAmount;
      debit.amount -= minAmount;
  
      if (credit.amount === 0) i++;
      if (debit.amount === 0) j++;
    }
  
    return result;
  }
  
  module.exports = {
    calculateBalances,
    minimizeTransactions
  };
  