import { Router } from "express";
import { SignUp, SignIn, SignOut, GetUserDetails, getAllUsers, updateUserDetails, deleteUser, verifyEmail, refreshToken } from "../controllers/user.controllers";
import { auth } from "../middlewares/auth";

const router = Router();

// User authentication routes
router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.get("/signout",auth, SignOut);
router.post("/verify-email",verifyEmail);
router.post("/refresh-token", refreshToken)

// User management routes
router.get("/all-users", getAllUsers);
router.get("/get-user-details",auth, GetUserDetails);
router.put("/update-user",auth, updateUserDetails);
router.delete("/delete-user", deleteUser);

export default router;