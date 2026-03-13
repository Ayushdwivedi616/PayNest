import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    month: {
        type: String, // e.g., "YYYY-MM"
        required: true,
    },
    income: {
        type: Number,
        required: true,
        default: 0,
    },
    categories: [
        {
            name: { type: String, required: true },
            allocated: { type: Number, required: true, default: 0 },
            spent: { type: Number, required: true, default: 0 },
        }
    ],
}, {
    timestamps: true,
});

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;
