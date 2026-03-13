import express from 'express';
import { getRents, addRent, deleteRent, toggleRent } from '../controllers/rentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getRents)
    .post(protect, addRent);

router.route('/:id')
    .delete(protect, deleteRent);

router.route('/:id/toggle')
    .put(protect, toggleRent);

export default router;
