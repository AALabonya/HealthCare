
import { Request, Response } from "express";
import { adminServices } from "./admin.service";

const pick =<T extends Record<string, unknown>, k extends keyof T>(obj:T, keys:k[]):Partial<T> =>{
   const finalObj:Partial<T>={};
   for(const key of keys){
      if(obj && Object.hasOwnProperty.call(obj, key)){
      finalObj[key]=obj[key]
      }
   }
   return finalObj
}

const getAllFromDB= async(req:Request, res:Response)=>{
    try {
      const filters = pick(req.query,['name','email','searchTerm','contactNumber'])
       const result = await adminServices.getAllFromDB(filters)
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