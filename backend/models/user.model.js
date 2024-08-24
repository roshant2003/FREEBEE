//
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'freelancer'],
        required: true
    },
    freelancerField: {
        type: String,
        default: 'freelancer',
        validate: {
            validator: function(value) {
                // Only validate if role is 'freelancer'
                if (this.role === 'freelancer') {
                    return value != null; // Ensure the field is not null or undefined
                }
                return true; // Skip validation for other roles
            },
            message: 'freelancerField is required when role is freelancer'
        }
    },
    city: {
        type:String,
        required:true
    },
    state: {
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },

    address: {
        type: String
    }
},
{timestamps:true});
export const User=mongoose.model('User',userSchema);


