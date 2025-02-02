import db from "../../libs/db.js";

export const getTagsController = async (req, res) => {
  const tags = await db.tag.findMany({
    select: {
      name: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const tagNames = tags.map((tag) => tag.name);
  res.json({ tags: tagNames });
};
