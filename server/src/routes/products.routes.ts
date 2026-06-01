
import { Router } from "express";
import { createProduct, deleteProduct, getAllProductDetails, getProductDetails, getProductsByCategory, getProductsBySubcategory, searchProducts, updateProduct } from "../controllers/products.controllers";


const router = Router();

router.post("/get-details", getProductDetails);
router.post("/create",  createProduct);
router.put("/update", updateProduct);
router.delete("/delete", deleteProduct);
router.get("/search", searchProducts);
router.get("/all", getAllProductDetails);
router.post("/by-category", getProductsByCategory);
router.post("/by-subcategory", getProductsBySubcategory);





export default router;