import { Router } from "express";
import { createCategory, deleteCategory,    getAllCategories,  getCategoryBySlug,  updateCategory } from "../controllers/category.controllers";

const router = Router()

router.get('/', getAllCategories);
router.post('/single-category', getCategoryBySlug);
router.post("/create",  createCategory);
router.put("/update", updateCategory);
router.delete("/delete", deleteCategory);





export default router;