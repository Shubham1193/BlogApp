import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const hashedPassword = bcryptjs.hashSync(password , 10)

  const newUser = new User({
    username,
    email,
    password : hashedPassword,
  });

  try {
    const user = await newUser.save();
    const {password : pass , ...rest} = user._doc
    res.json(rest);
  } catch (err) {
    res.json(err);
  }
};
