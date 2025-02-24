import Message from "../models/message.model.js"
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const getUserForSidebar = async(req,res)=>{
    try {

        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUser);

    } catch (error) {

        console.log("Error in getUserForSidebar",error.message);
        res.status(500).json({message:"Internal Server Error"});

    }
}

export const getMessages = async (req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const myId = req.user._id;

        const  messages = await Message.find({
            $or:[
                {
                    senderId:myId,
                    reciverId:userToChatId
                },
                {
                    senderId:userToChatId,
                    reciverId:myId
                }
            ]
        });

        res.status(200).json(messages);


    } catch (error) {

        console.log("Error in getMessage controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
        
    }
}

export const sendMessages = async(req,res)=>{
    try {
        const {image,text} = req.body;
        const {id:reciverId} = req.params;
        const senderId = req.user._id;

        let imageURL;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image:imageURL
        });

        await newMessage.save();

        res.status(201).json(newMessage);



    } catch (error) {

        console.log("Error in sendMessage controller",error);
        res.status(500).json({error:"Internal Server Error"});
        
    }
}