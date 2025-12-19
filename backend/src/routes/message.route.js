import express from "express"


const messageRouter = express.Router()

messageRouter.post("/send", (req, res)=>{
    res.send("Send message endpoint")
});






export default messageRouter;