import { Router } from "express";
import { SignUp, SignIn, SignOut, GetUserDetails, getAllUsers, updateUserDetails, deleteUser } from "../controllers/user.controllers";

const router = Router();

// User authentication routes
router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/signout", SignOut);

// User management routes
router.get("/all", getAllUsers);
router.get("/:id", GetUserDetails);
router.put("/:id", updateUserDetails);
router.delete("/:id", deleteUser);

export default router;