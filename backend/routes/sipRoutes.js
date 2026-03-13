import express from 'express';
import { getSips, addSip, deleteSip, toggleSip } from '../controllers/sipController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getSips)
    .post(protect, addSip);

router.route('/:id')
    .delete(protect, deleteSip);

router.route('/:id/toggle')
    .put(protect, toggleSip);

export default router;
