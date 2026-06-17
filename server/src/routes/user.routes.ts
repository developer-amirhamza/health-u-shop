import { Router } from "express";
import { SignUp, SignIn, SignOut, GetUserDetails, getAllUsers, updateUserDetails, deleteUser, verifyEmail, refreshToken, updateUserByAdmin, } from "../controllers/user.controllers";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.get("/signout", auth, SignOut);
router.post("/verify-email", verifyEmail);
router.post("/refresh-token", refreshToken)

router.get("/all-users", auth, getAllUsers);
router.get("/get-user-details", auth, GetUserDetails);
router.put("/update-user", auth, updateUserDetails);
router.put("/update-user-by-admin", auth, updateUserByAdmin);
router.delete("/delete-user", auth, deleteUser);

export default router;