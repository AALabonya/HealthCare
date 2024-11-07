import { Request, Response } from "express";
import { userService } from "./user.service";
import { log } from "console";

const createAdmin = async(req:Request, res:Response)=>{
    // console.log(req.body)
  const result = await  userService.createAdmin(req.body);
  // res.send(result)
  res.status(200).json({
    success:true,
    message:"Admin Created successfully",
    data:result
  })
}

export const userController ={
    createAdmin
}