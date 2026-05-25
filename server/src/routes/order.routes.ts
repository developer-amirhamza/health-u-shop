import { Router } from "express";
import { getAllOrdersByAdmin, getMyOrders, getOrdersByOrderNumber, placeOrder, updateOrderByAdmin } from "../controllers/order.controllers";
import { auth } from "../middlewares/auth";


const router = Router();


router.post("/place-order",auth, placeOrder);
router.get("/my-orders", auth, getMyOrders);
router.get("/lookup", getOrdersByOrderNumber);
router.get("/admin/get-all-orders",auth, getAllOrdersByAdmin);
router.put("/admin/update-order",auth,updateOrderByAdmin);
// router.put("/admin/delete-order", auth,deleteO)




export default router;

