import express from 'express';
import { setBudget, getBudget } from '../controllers/budgetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, setBudget);

router.route('/:month')
    .get(protect, getBudget);

export default router;
