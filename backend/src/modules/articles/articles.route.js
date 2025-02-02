import express from "express";
import { getArticlesController } from "./articles.controller.js";

const router = express.Router();

router.get("/", getArticlesController);

export default router;
