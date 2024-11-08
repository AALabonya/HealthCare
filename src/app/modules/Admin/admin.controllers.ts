import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { adminServices } from "./admin.service";

const prisma =new PrismaClient()

const getAllFromDB= async(req:Request, res:Response)=>{
    try {
       const result = await adminServices.getAllFromDB()
     res.status(200).json({
        success:true,
        message: "Admin fached successfully",
        data: result
     })
    } catch (error) {
       res.status(500).json({
         success:false,
         message:error?.name || "Something went wrong",
         data: error
       })
    }
}

export const adminController={
    getAllFromDB
}