import { Router } from "express";
import { addReview, deleteReview, getProductReviews, updateReview } from "../controllers/review.controllers";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/add-review", auth, addReview);
router.post("/get-reviews", getProductReviews);
router.put("/update-review", auth, updateReview);
router.delete("/delete-review", auth, deleteReview);

export default router