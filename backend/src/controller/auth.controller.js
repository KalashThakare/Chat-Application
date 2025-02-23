import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";

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


export const login = (req,res) => {
    const {username,password} = req.body;
    try {
        
    } catch (error) {
        
    }
};


export const logout = (req,res) => {
    const {username,password} = req.body;
    try {
        
    } catch (error) {
        
    }
}