import mongoose from 'mongoose';

const rentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    landlordName: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    dueDate: {
        type: Number, // Day of the month (1-31)
        required: true,
    },
    autoPay: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});

const Rent = mongoose.model('Rent', rentSchema);

export default Rent;
