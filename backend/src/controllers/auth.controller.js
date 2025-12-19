import User from "../models/Users.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utlis.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";

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
            const savedUser = await newUser.save()
            generateToken(newUser._id, res)
            res.status(201).json({success:true , user:{
                _id:newUser._id,
                fullName: newUser.fullName, 
                email: newUser.email,
                profilePic: newUser.profilePic,
            }});
            try{
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL)
            }catch(error){
                console.log("Failed to send email.")
            }
        }else{
            res.status(400).json({success:false, message:"Invalid user Data"})
        }
    }catch(error){
        console.log("Error: "+ error.message)
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success:false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    const hashToCompare = user ? user.password : ENV.DUMMY_HASH;
    const isPasswordCorrect = await bcrypt.compare(password, hashToCompare);

    // unified error message & timing
    if (!user || !isPasswordCorrect) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};