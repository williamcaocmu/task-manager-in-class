import db from "../../libs/db.js";

export const findUserByEmail = async (email) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const findUserById = async (id) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
    },
  });

  return user;
};

export const createUser = async (data) => {
  const user = await db.user.create({
    data,
  });

  return user;
};
