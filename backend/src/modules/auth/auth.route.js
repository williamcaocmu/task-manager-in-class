import express from "express";
import {
  loginUserController,
  signupUserController,
} from "./auth.controller.js";

const router = express.Router();

// signup user
router.post("/signup", signupUserController);

// login user
router.post("/login", loginUserController);

export default router;
