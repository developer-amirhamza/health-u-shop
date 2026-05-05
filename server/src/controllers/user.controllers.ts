
import { Response, Request } from "express";
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { errorHandler } from "../utils/errorHandler";
import { sendEmail } from "../config/sendEmail";
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate";

interface CreateUserInput {
    id?: string | number,
    fullName?: string,
    email?: string,
    phone?: number,
    password?: string,
    image?: string,
}

const SignUp = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, password, } = req.body;
        const id = uuidv4();
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Provide the name, email and password",
            });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return errorHandler(res, 400, "This user already exists", false);
        };
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                verify_email: false,
                status: "ACTIVE",
                mobile: phone?.toString(),
            },
        });
        const verifyEmailUrl = `${process.env.CLIENT}/verify-email?code=${user.id}`;
        const emailResult = await sendEmail({
            sendTo: email,
            subject: "Verify email from Health U Shop",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl,
            }),
        });
        res.status(200).json({
            success: true,
            error: false,
            message: "Your account has been created successfully!",
            data: emailResult,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!",
        })
    }
};

const SignIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return errorHandler(res, 404, "Please provide the email or password", true);
        };


        res.status(200).json({
            success: true,
            error: false,
            message: "User signed in successfully",
            
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        });
    }
};

const SignOut = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            success: true,
            error: false,
            message: "User signed out successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        });
    }
};

const GetUserDetails = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id || (req as any).user?.id;
        if (!userId) {
            return errorHandler(res, 400, "User ID is required", false);
        };
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return errorHandler(res, 404, "User not found", false);
        };
        res.status(200).json({
            success: true,
            error: false,
            data: user
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        });
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({
            success: true,
            error: false,
            data: users
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        });
    }
};

const updateUserDetails = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id || (req as any).user?.id;
        if (!userId) {
            return errorHandler(res, 400, "User ID is required", false);
        };
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: req.body
        });
        res.status(200).json({
            success: true,
            error: false,
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id || (req as any).user?.id;
        if (!userId) {
            return errorHandler(res, 400, "User ID is required", false);
        };
        await prisma.user.delete({ where: { id: userId } });
        res.status(200).json({
            success: true,
            error: false,
            message: "User deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        });
    }
};

export { SignIn, SignOut, SignUp, GetUserDetails, getAllUsers, updateUserDetails, deleteUser };