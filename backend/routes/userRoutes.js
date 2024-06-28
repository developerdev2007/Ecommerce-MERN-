import express from "express";
import {
  createUser,
  loginUser,
  logOutCurrentUser,
  getAllUsers,
  getCurrentUserprofile,
  updateCurrentUser,
  deleteUserId,
  getUserById,
  updateUserById,
} from "../controllers/userControllers.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logOutCurrentUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUserprofile)
  .put(authenticate, updateCurrentUser);
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserId)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);
export default router;
