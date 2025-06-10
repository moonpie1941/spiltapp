// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  paid_by: { type: String, required: true },
  participants: { type: [String], required: true },
  split_type: { type: String, enum: ['equal', 'percentage', 'exact'], default: 'equal' },
  split_values: { type: Map, of: Number }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
