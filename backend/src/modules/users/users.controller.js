import { findUserById } from "./users.service.js";

export const getMeController = async (req, res) => {
  const user = await findUserById(req.userId);
  res.json({ message: "User logged in", user });
};

export const getUserInfoByIdController = async (req, res) => {
  const user = await findUserById(Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User info", user });
};
