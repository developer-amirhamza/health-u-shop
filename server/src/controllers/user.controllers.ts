import { db } from "../models";
import { Response, Request } from "express";
import {v4 as uuidv4 } from "uuid"
import bcrypt from "bcrypt";

interface CreateUserInput {
    id?:string | number,
    fullName?: string,
    email?: string ,
    phone?: number,
    password?:string,
    image?:string,
}

const User = db.user;

const SignUp = async(req:Request, res:Response)=>{
    try {
        const {fullName, email, phone, password,} = req.body;
        // generate unique id,
        const id = uuidv4();
        // hashing password with bcrypt
        const hashPassword = await bcrypt.hash(password, 10);
        // create user details
        const user = await User.create({fullName, id, email, password,phone});

        res.status(400).json({
            success: true,
            error:false,
            message:"Your account has been created successfully!",
            data:user,
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            error:true,
            message:error.message || "Internal server error!",
        })
    }
};

const SignIn = async(req:Request, res:Response)=>{
    try {

    } catch (error:any) {
        res.status(500).json({
            success:false,
            error:true,
            message:error.message || "Internal server error!"
        });
    }
};

const SignOut = async(req:Request, res:Response)=>{
    try {

    } catch (error:any) {
        res.status(500).json({
            success:false,
            error:true,
            message:error.message || "Internal server error!"
        });
    }
};

const getUserDetails = async(req:Request, res:Response)=>{
    try {

    } catch (error:any) {
        res.status(500).json({
            success:false,
            error:true,
            message:error.message || "Internal server error!"
        });
    }
};

const updateUserDetails = async(req:Request, res:Response)=>{
    try {

    } catch (error:any) {
        res.status(500).json({
            success:false,
            error:true,
            message:error.message || "Internal server error!"
        });
    }
};

const deleteUser= async(req:Request, res:Response)=>{
    try {

    } catch (error:any) {
        res.status(500).json({
            success:false,
            error:true,
            message:error.message || "Internal server error!"
        });
    }
};

// get all users
const getAllUsers = async(req:Request, res:Response)=>{
    try {

    } catch (error:any) {
        res.status(500).json({
            success:false,
            error:true,
            message:error.message || "Internal server error!"
        });
    }
};


export default {SignIn, SignOut, SignUp, getUserDetails, getAllUsers, updateUserDetails,deleteUser};