const express = require('express');
const router = express.Router();
const {
  addExpense, getExpenses, updateExpense, deleteExpense
} = require('../controllers/expenseController');

router.get('/expenses', getExpenses);
router.post('/expenses', addExpense);
router.put('/expenses/:id', updateExpense);
router.delete('/expenses/:id', deleteExpense);

module.exports = router;
