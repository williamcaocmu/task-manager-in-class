import db from "../../libs/db.js";

export const getCommentsByArticleIdController = async (req, res) => {
  const articleId = req.params.articleId;

  const comments = await db.comment.findMany({
    where: {
      articleId: Number(articleId),
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });

  res.json(comments);
};

export const createCommentController = async (req, res) => {
  const { articleId, content } = req.body;
  const userId = Number(req.userId);

  const comment = await db.comment.create({
    data: { articleId, content, userId },
  });

  res.json(comment);
};

export const deleteCommentController = async (req, res) => {
  const articleId = Number(req.params.articleId);
  const commentId = Number(req.params.commentId);
  const userId = Number(req.userId);

  const comment = await db.comment.findUnique({
    where: {
      id: commentId,
      articleId,
    },
  });

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  // Check if the comment is owned by the user
  if (comment.userId !== userId) {
    return res
      .status(403)
      .json({ message: "You are not allowed to delete this comment" });
  }

  await db.comment.delete({
    where: {
      id: commentId,
      articleId,
      userId,
    },
  });

  res.json({ message: "Comment deleted" });
};
