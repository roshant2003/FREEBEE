import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    // Inherit from the base User schema
    historyOfRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request'
    }]
    // Add other customer-specific fields if needed
});

export const Customer=mongoose.model("Customer",customerSchema);