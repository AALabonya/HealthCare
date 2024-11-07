import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma =new PrismaClient()

const getAllFromDB= async(req:Request, res:Response)=>{
    const result = await
}