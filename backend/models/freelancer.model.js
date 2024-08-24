import mongoose from "mongoose";

const freelancerSchema = new mongoose.Schema({
    // Inherit from userSchema
    skills: {
        type: [String], // Array of skills
        required: true
    },
    experience: {
        type: Number, // Number of years of experience
        required: true
    },
    hourlyRate: {
        type: Number, // Rate per hour
        required: true
    },
    ratings: {
        type:[Number],
    },
    profile_pic:{
        type:String,  // URL for the image
    },

    // Optionally include additional fields specific to freelancers
    // For example: profile picture, certifications, etc.
});

// Create a model that inherits from User schema
export const Freelancer=mongoose.model("Freelancer",freelancerSchema)
