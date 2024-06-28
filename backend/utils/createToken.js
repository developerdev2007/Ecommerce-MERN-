import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "developement",
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
  return token;
};
export default generateToken;
