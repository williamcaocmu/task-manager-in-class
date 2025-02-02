import express from "express";
import {
  getCommentsByArticleIdController,
  createCommentController,
  deleteCommentController,
} from "./comments.controller.js";
import { authentication } from "../../middleware/authentication.js";

const router = express.Router();

// ENDPOINT: GET /api/comments/:articleId
// ENDPOINT: GET /api/comments?articleId=1
router.post("/", [authentication], createCommentController);
router.get("/:articleId", getCommentsByArticleIdController);
router.delete(
  "/:articleId/:commentId",
  [authentication],
  deleteCommentController
);

export default router;
