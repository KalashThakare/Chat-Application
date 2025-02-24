import express from "express";
import { protectRoute } from "../midleware/auth.middleware.js";
import { getMessages, getUserForSidebar, sendMessages } from "../controller/message.controller.js";

const router = express.Router();

router.get("/users",protectRoute,getUserForSidebar);

router.get("/:id",protectRoute,getMessages);

router.get("/send/:id",protectRoute,sendMessages);

export default router;