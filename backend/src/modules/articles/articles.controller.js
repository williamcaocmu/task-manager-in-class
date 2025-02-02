import db from "../../libs/db.js";

export const getArticlesController = async (req, res) => {
  const tag = req.query.tag;

  const articles = await db.article.findMany({
    where: {
      tag: {
        name: {
          contains: tag,
          mode: "insensitive",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tag: true,
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
  res.json({ articles });
};
