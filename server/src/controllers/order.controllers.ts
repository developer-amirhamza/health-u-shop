import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { errorHandler } from "../utils/errorHandler";
import { getCartToken, getOrCreateCart } from "./cart.controllers";




interface AuthRequest extends Request {
    userId?: string;
}
const generateOrderNumber =async ()=>{
    const date = new Date();
    const prefix = `ORD-${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,"0")}${date.getDate().toString().padStart(2,"0")}`

    let orderNumber = `${prefix}-001`;
    let counter = 1;
    while(await prisma.order.findUnique({where:{orderNumber}})){
        orderNumber = `${prefix}-${counter.toString().padStart(3,"0")}`;
        counter++;
    }
    return orderNumber;
}


export  const placeOrder = async (req:Request, res:Response) =>{
    try {
        const {phone,shippingAddress, paymentMethod="COD"} = req.body;
        const token = await getCartToken(req, res);
        const userId = req.userId;

        const cart = await getOrCreateCart(token, userId);
        if(!cart || cart.items.length === 0){

        }

    } catch (error:any) {
        errorHandler(res,500,error || "Internal server error!");
    }
};

