import { Router } from "express";
import { SignUp, SignIn, SignOut, GetUserDetails, getAllUsers, updateUserDetails, deleteUser, verifyEmail } from "../controllers/user.controllers";
import { auth } from "../middlewares/auth";

const router = Router();

// User authentication routes
router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.get("/signout",auth, SignOut);
router.post("/verify-email",verifyEmail);
// router.post("/refresh-token", refresh )

// User management routes
router.get("/all", getAllUsers);
router.get("/:id", GetUserDetails);
router.put("/:id", updateUserDetails);
router.delete("/:id", deleteUser);

export default router;