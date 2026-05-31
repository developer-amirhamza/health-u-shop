import { Router } from "express";
import { addReview, deleteReview, getProductReviews, updateReview } from "../controllers/review.controllers";
import { auth } from "../middlewares/auth";

const router = Router();


router.post("/add-review",auth, addReview);
router.post("/get-reviews", getProductReviews);
router.put("/update-review", updateReview);
router.delete("/delete-review", deleteReview);



export default router