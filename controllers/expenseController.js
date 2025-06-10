// controllers/expenseController.js

const Expense = require('../models/Expense');

// GET /expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json({ success: true, data: expenses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /expenses
const addExpense = async (req, res) => {
  try {
    const { amount, description, paid_by, participants, split_type, split_values } = req.body;

    if (!amount || amount <= 0 || !description || !paid_by || !participants || participants.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid expense data' });
    }

    const newExpense = new Expense({
      amount,
      description,
      paid_by,
      participants,
      split_type: split_type || 'equal',
      split_values: split_values || {}
    });

    const saved = await newExpense.save();
    res.status(201).json({ success: true, data: saved, message: 'Expense added successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /expenses/:id
const updateExpense = async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /expenses/:id
const deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }
    res.json({ success: true, message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
};
