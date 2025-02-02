import { verifyToken } from "../utils/jwt.js";

export const authentication = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const tokenPayload = token.split(" ")[1];

  let decodedToken;

  try {
    decodedToken = verifyToken(tokenPayload);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.userId = decodedToken.id;

  next();
};
