import { comparePassword, hashPassword } from "../../utils/hashing.js";
import { generateToken } from "../../utils/jwt.js";
import { createUser, findUserByEmail } from "../users/users.service.js";

// signup user
export const signupUserController = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "User is already exists" });
  }
  const hashedPassword = await hashPassword(password);
  const user = await createUser({ email, password: hashedPassword });
  res.json({ message: "User created", user });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "User is not exists" });
  }
  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Password is incorrect" });
  }
  const token = generateToken({ id: user.id });
  res.json({ message: "User logged in", token });
};
