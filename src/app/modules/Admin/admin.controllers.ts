
import { Request, Response } from "express";
import { adminServices } from "./admin.service";
import pick from "../../../shared/pick";



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