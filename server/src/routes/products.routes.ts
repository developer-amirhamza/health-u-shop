
import { Router } from "express";
import { createProduct, deleteProduct, getAllProductDetails, getProductDetails, searchProducts, updateProduct } from "../controllers/products.controllers";


const router = Router();

router.post("/get-details", getProductDetails);
router.post("/create",  createProduct);
router.put("/update", updateProduct);
router.delete("/delete", deleteProduct);
router.get("/search", searchProducts);
router.get("/all", getAllProductDetails);




export default router;