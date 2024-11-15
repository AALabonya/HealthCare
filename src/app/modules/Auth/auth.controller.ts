import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { authServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(async(req:Request, res:Response)=>{
    const result = await authServices.loginUser()

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"logged id successfully",
        data:result
    })
})

export const authController={
    loginUser
}