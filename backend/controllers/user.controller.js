// provide the business logic for the users page 


import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
export const register = async (req, res) => {

    try {
        const { fullname, email, phoneNumber, password, role, city, state, pincode, address, freelancerField } = req.body;

        // Basic validation for required fields
        if (!fullname || !email || !phoneNumber || !password || !role || !city || !state || !pincode || !address) {
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false
            });
        }

        // Additional check for freelancerField when role is 'freelancer'
        if (role === 'freelancer' && (!freelancerField || freelancerField.trim() === '')) {
            return res.status(400).json({
                message: "freelancerField is required for freelancers",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            city,
            state,
            pincode,
            address,
            freelancerField: role === 'freelancer' ? freelancerField : undefined // Only include if role is 'freelancer'
        });

        return res.status(201).json({
            message: "User created successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

//login page logic 

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            })
        };
        //check role is correct or not 
        if (role != user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role,",
                success: false
            })
        };
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            city: user.city,
            sate: user.state,
            pincode: user.pincode,
            address: user.address
        }

        //login expires in 1 day ig

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })

    }
    catch (error) {
        console.log(error);
    }
}

//logout page
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully.",
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}
//updating the profile
export const updateProfile = async (req, res) => {
    try {
        const {
            fullname,
            email,
            phoneNumber,
            city,
            state,
            pincode,
            address,
            freelancerField // Add this field for conditional check
        } = req.body;
    
        //cloudinery
        const userId = req.id;
        let user = await User.findById(userId);
    
        // update the fieds if exists
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(city) user.city = city
        if(state) user.state=state
        if(pincode) user.pincode = pincode
        if(address) user.address=address
    
        // Update freelancer-specific field only if role is 'freelancer'
        if (user.role === 'freelancer' && freelancerField) {
            user.freelancerField = freelancerField;
        }
    
        await user.save();
    
        // Prepare the updated user object to return
        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            city: user.city,
            state: user.state,
            pincode: user.pincode,
            address: user.address,  // Include profile in case it has other relevant data
        };
    
        // If the user is a freelancer, include the freelancerField in the response
        if (user.role === 'freelancer') {
            updatedUser.freelancerField = user.freelancerField;
        }
    
        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
            success: true
        });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while updating the profile",
            success: false
        });
    }
}

