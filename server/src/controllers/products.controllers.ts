import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { prisma } from "../lib/prisma";



export const createProduct = async (req: Request, res: Response) => {
    try {
        console.log("controllers works", req.body)
        const { title, price, description, colors, sized, discount, more_details, category, stock, images } = req.body;
        if (!title || !price || !discount ) {
            return errorHandler(res, 400, "Please provide the required fields", true)
        }

        const newProduct = await prisma.product.create({
            data: { title, price, description, colors, sized, discount, more_details, category, stock, images }
        });
        return errorHandler(res, 200, "Tha product has been created successfully!", false, newProduct)
    } catch (error: any) {
        errorHandler(res, 500, error.message || "Internal server error!", true);
    }
};


export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        // const id:any = req.params;
        // const {title, price, description,colors,sized,discount,more_details,category,stock,images} = req.body;
        if (!id) return errorHandler(res, 404, "Product id is required!");
        const existingProduct = await prisma.product.findUnique({ where: { id: id } });
        if (!existingProduct) return errorHandler(res, 404, "The product not found!",)
        const updatedProduct = await prisma.product.update({
            where: { id: id },
            data: { ...req.body }
        })
        return errorHandler(res, 200, "The product has been updated  successfully!", false, updatedProduct);
    } catch (error: any) {
        errorHandler(res, 500, error.message || "Internal server error!", true);
    }
};



export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        if (!id) return errorHandler(res, 404, "Product id is required!");
        const existingProduct = await prisma.product.findUnique({ where: { id: id } });
        if (!existingProduct) return errorHandler(res, 404, "The product not found!",)
        await prisma.product.delete({ where: { id: id } });
        await prisma.product.update({
        where: { id },
        data: { deletedAt: new Date(), isActive: false },
        });
        // Example: get all products
        const products = await prisma.product.findMany({
        where: { deletedAt: null, isActive: true },
        // ...
        });
        return errorHandler(res, 200, "The product has been deleted!", false);
    } catch (error: any) {
        errorHandler(res, 500, error.message || "Internal server error!", true);
    }
};


export const getProductDetails = async (req: Request, res: Response) => {
    try {
        const id:any  = req.params;
        if (!id) return errorHandler(res, 404, "Product id is required!");
        const existingProduct = await prisma.product.findUnique({ where: { id: id } });
        if (!existingProduct) return errorHandler(res, 404, "The product not found!",)
        return errorHandler(res, 200, "the product has been gotten successfully!", false, existingProduct);
    } catch (error: any) {
        errorHandler(res, 500, error.message || "Internal server error!", true);
    }
};



export const getAllProductDetails = async (req: Request, res: Response) => {
    try {
        const allProducts = await prisma.product.findMany();
        if (!allProducts) return errorHandler(res, 404, "Products not found!");
        return errorHandler(res, 200, "The product got successfully!", false, allProducts);
    } catch (error: any) {
        errorHandler(res, 500, error.message || "Internal server error!", true);
    }
};


export const searchProducts = async (req: Request, res: Response) => {
    try {
        const { q, category, minPrice, maxPrice, inStock, sortBy, page = "1", limit = "20" } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
        const take = parseInt(limit as string);


        let where: any = { isActive: true };

        // Full-text search on name and description
        if (q && typeof q === "string") {
            where.OR = [
                { title: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } }
            ]
        };

        if (category && typeof category === "string") {
            where.category = category;
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {};
            if(minPrice) where.price.gte = parseFloat(minPrice as string);
            if(maxPrice) where.price.lte = parseFloat(maxPrice as string);
        };

        if(inStock === "true"){
            where.stock = {gt:0};
        };

        // Sorting
        let orderBy :any = {createdAt: "desc"}
        if (sortBy === "price_acs") orderBy = {price: "asc"};
        if(sortBy === "price_desc") orderBy = {price: "desc"}
        if(sortBy === "oldest") orderBy = {createdAt: "asc"}


        const [products, totalCount] = await Promise.all([
            prisma.product.findMany({orderBy,where,skip,take}),
            prisma.product.count({where}),
        ]);

        res.status(200).json({
            success:true,
            data:products,
            pagination:{
                totalPages: Math.ceil(totalCount / take),
                page: parseInt(page as string),
                limit:take,
                totalCount,
            }
        })
    } catch (error: any) {
        errorHandler(res, 500, error.message || "Internal server error!");
    }
};