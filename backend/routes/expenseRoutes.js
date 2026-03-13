import express from 'express';
import { getExpenses, addExpense, deleteExpense, getAnalytics } from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getExpenses)
    .post(protect, addExpense);

router.route('/analytics')
    .get(protect, getAnalytics);

router.route('/:id')
    .delete(protect, deleteExpense);

export default router;
