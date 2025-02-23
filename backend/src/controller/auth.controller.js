import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import cloudinary from "cloudinary";

export const signup = async (req,res) => {
    const {fullname,email,password} = req.body;
    try {

        if(!fullname || !email || !password){
            return res.status(400).json({message:"All fields are necessary"});
        }

        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters long"});
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message:"Email alredy exist"});
        }

        const salt = await bcrypt.genSalt(11);
        const hashedPass = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullname,
            email,
            password:hashedPass
        })

        if(newUser){
             generateToken(newUser._id, res)
             await newUser.save();

             res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                email:newUser.email,
                profilePic:newUser.profilepic
             })


        }                           
        else{
            return res.status(400).json({message:"Invallid user data"})
        }



    } catch (error) {
        console.log("Error in signup controler",error.message);
        res.status(500).json({message:"Internal server error"});
    }
};


export const login = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const checkPassword =  await bcrypt.compare(password,user.password);

        if(!checkPassword){
            return res.status(400).json({message:"Invalid credentials"});
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            profilePic:user.profilepic
        });


    } catch (error) {
        console.log("Error in login controller-",error.message);
        res.status(500).json({message:"Internal server error"});
    }
};


export const logout = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {

        console.log("Error in logout controller-",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}


export const updateProfile = async(req,res)=>{
    try {
        const {profilepic} = req.body;
        const userId = req.user._id;

        if(!profilepic){
            return res.status(400).json({message:"Profile pic is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilepic);

        const updatedUserProfile = await User.findByIdAndUpdate(userId,{profilepic:uploadResponse.secure_url});

        res.status(200).json(updatedUserProfile);


    } catch (error) {
        console.log("Error in update profile route",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const checkAuth = (req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checkAuth controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}