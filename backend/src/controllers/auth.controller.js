import User from "../models/Users.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utlis.js";

export const signup = async (req, res)=>{
    const {fullName, email , password} = req.body;
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({success:false, message:"Please provide all the credentials"})
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
        if(!passwordRegex.test(password)){
            return res.status(400).json({success:false, message:"Password must be at least 8 characters \n Password must contains at least 1 uppercase letter, 1 lowercase letter and a speical character."})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false, message:"Please provide valid email address."})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({success:false, message:"Email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email, 
            password: hashedPassword
        });
        if(newUser){
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({success:true , user:{
                _id:newUser._id,
                fullName: newUser.fullName, 
                email: newUser.email,
                profilePic: newUser.profilePic,
            }});
        }else{
            res.status(400).json({success:false, message:"Invalid user Data"})
        }
    }catch(error){
        console.log("Error: "+ error.message)
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
}

export const login = async ()=>{

}


export const logout = async ()=>{

}