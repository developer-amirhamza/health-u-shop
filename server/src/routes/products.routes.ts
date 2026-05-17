
import { Router } from "express";
import { createProduct, deleteProduct, getProductDetails, searchProducts, updateProduct } from "../controllers/products.controllers";


const router = Router();

router.post("/get-product-details", getProductDetails);
router.post("/create-product",  createProduct);
router.put("/update-product", updateProduct);
router.delete("/delete-product", deleteProduct);
router.get("/search", searchProducts);





export default router;