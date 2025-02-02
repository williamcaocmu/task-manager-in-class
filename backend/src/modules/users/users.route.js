import express from "express";
import { authentication } from "../../middleware/authentication.js";
import {
  getMeController,
  getUserInfoByIdController,
} from "./users.controller.js";

const router = express.Router();

// authentication required
router.get("/me", [authentication], getMeController);
router.get("/:id", getUserInfoByIdController);

export default router;
