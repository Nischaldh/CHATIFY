import express from "express"
import dotenv from "dotenv"
import path from "path";

import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const __dirname = path.resolve();




app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
    })
}



app.listen(PORT , ()=>{
    console.log(`Sever is running  in ${PORT}`);
    connectDB()
})