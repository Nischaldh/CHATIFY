import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

dotenv.config();

const PORT = process.env.PORT || 3000;


const app = express()




app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.get("/",(req,res)=>{
    res.send("Hello");
})



app.listen(PORT , ()=>console.log(`Sever is running  in ${PORT}`))