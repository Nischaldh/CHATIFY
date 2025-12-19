import jwt from "jsonwebToken"

export const generateToken = (userId, res)=>{
    //creating a token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie("jwt", token, {
        maxAge: 7 * 24* 60 *60 *1000,
        httpOnly:true, //for XSS
        sameSite: "strict", // for CSRF
        secure:process.env.NODE_ENV ==="development"?false:true,
    })
    return token;
}