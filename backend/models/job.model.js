import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
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
        enum: ['open', 'assigned', 'in_progress', 'completed', 'closed', 'cancelled'],
        default: 'open'
    },
    budget: {
        type: Number
    },
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request' // Reference to Request schema
    }],
    // Additional fields such as start/end dates, location, etc.
}, { timestamps: true });

export const Job = mongoose.model('Job', jobSchema);
