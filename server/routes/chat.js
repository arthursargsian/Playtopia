import express from "express";
import OpenAiController from "../controllers/OpenAiController.js"

const router = express.Router();

router.post('/bot', OpenAiController.message);

export default router;