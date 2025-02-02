import express from "express";
import { getTagsController } from "./tags.controller.js";

const router = express.Router();

router.get("/", getTagsController);

export default router;
