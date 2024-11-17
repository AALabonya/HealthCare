import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { authServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(async(req:Request, res:Response)=>{
    const result = await authServices.loginUser(req.body)
const{refreshToken} = result;

    res.cookie('refresh',refreshToken,{
        secure:false,
        httpOnly:true
    })



    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"logged id successfully",
        data:{
            accessToken:result.accessToken,
            needPasswordChange: result.needPasswordChange
        }
    })
})
const refreshToken = catchAsync(async(req:Request, res:Response)=>{
    const result = await authServices.loginUser(req.body)


    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"logged id successfully",
        data:result
        // data:{
        //     accessToken:result.accessToken,
        //     needPasswordChange: result.needPasswordChange
        // }
    })
})
export const authController={
    loginUser
}