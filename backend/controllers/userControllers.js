import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    throw new Error(
      "Please provide all required fields (username, email, password)"
    );
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json("User with this email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });
  try {
    await newUser.save();
    createToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {}

  console.log({ username, email, password });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const passwordIsValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (passwordIsValid) {
      createToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    }
  }
});

const logOutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", " ", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "LogOut has been Successfully done" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json(allUsers);
});

const getCurrentUserprofile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const updateCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }
    const updatedUser = await user.save();

    res.status(201).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      //  password: updatedUser.password,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("User is not found!!!");
  }
});
const deleteUserId = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      throw new Error("Cannot delete Admin user!!!");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User has been deleted!!!" });
  } else {
    res.status(404);
    throw new Error("User  not found");
  }
});
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("Cannot find User !!!");
  }
});
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Cannot find User !!!");
  }
});
export {
  createUser,
  loginUser,
  logOutCurrentUser,
  getAllUsers,
  getCurrentUserprofile,
  updateCurrentUser,
  deleteUserId,
  getUserById,
  updateUserById,
};
