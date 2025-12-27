import express from "express"
import { ENV } from "./lib/env.js";
import path from "path";
import cookieParser from "cookie-parser"
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";


const PORT = ENV.PORT || 3000;

app.use(express.json( {limit: "5mb"}));     
app.use(express.urlencoded({extended:true}));
app.use(cors({ origin: ENV.CLIENT_URL|| "http://localhost:5173", credentials: true }));
app.use(cookieParser())

const __dirname = path.resolve();




app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);



server.listen(PORT , ()=>{
    console.log(`Sever is running  in ${PORT}`);
    connectDB()
})