import { Router } from "express";
import { createSubcategory, deleteSubcategory, getSubcategoriesByCategory, getSubcategoryBySlug, updateSubcategory } from "../controllers/subcategory.controllers";
import { auth } from "../middlewares/auth";


const router = Router();

// Public
router.post('/category/subcategories-by-categories', getSubcategoriesByCategory);
router.get('/subcategory-by-slug', getSubcategoryBySlug);

// Admin only
router.post('/create',  createSubcategory);
router.put('/update',  updateSubcategory);
router.delete('/delete', deleteSubcategory);

export default router;