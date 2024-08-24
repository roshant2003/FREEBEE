import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freelancer'
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'assigned', 'in_progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    budget: {
        type: Number
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job' // Reference to Job schema
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
}, { timestamps: true });

export const Request = mongoose.model('Request', requestSchema);
