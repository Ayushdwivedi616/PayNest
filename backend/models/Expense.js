import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    category: {
        type: String, // Rent, Food, Travel, Savings, SIP, Misc
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
