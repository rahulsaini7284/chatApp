import jwt from "jsonwebtoken";

const genrateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" });
};

export default genrateToken;
