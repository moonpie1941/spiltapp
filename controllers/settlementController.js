// controllers/settlementController.js
const Expense = require('../models/Expense');
const { calculateBalances, minimizeTransactions } = require('../utils/settlementCalculator');

// GET /people
const getPeople = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const peopleSet = new Set();

    expenses.forEach(expense => {
      peopleSet.add(expense.paid_by);
      expense.participants.forEach(p => peopleSet.add(p));
    });

    res.json({
      success: true,
      data: Array.from(peopleSet)
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching people.' });
  }
};

// GET /balances
const getBalances = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const balances = calculateBalances(expenses);
    res.json({ success: true, data: balances });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error calculating balances.' });
  }
};

// GET /settlements
const getSettlements = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const balances = calculateBalances(expenses);
    const settlements = minimizeTransactions(balances);
    res.json({ success: true, data: settlements });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error calculating settlements.' });
  }
};

module.exports = {
  getPeople,
  getBalances,
  getSettlements
};
