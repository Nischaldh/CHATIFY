import express from "express"
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjectProtection } from "../middleware/arcjet.middleware.js";

const messageRouter = express.Router()

messageRouter.use(arcjectProtection)
messageRouter.use(protectRoute)

messageRouter.get("/contacts",getAllContacts);
messageRouter.get("/chats",getChatPartners);
messageRouter.get("/:id",getMessagesByUserId);
messageRouter.post("/send/:id",sendMessage);


export default messageRouter;