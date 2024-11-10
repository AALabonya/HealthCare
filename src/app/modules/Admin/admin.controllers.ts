
import { Request, Response } from "express";
import { adminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import httpStatus from "http-status";



const getAllFromDB= async(req:Request, res:Response)=>{
    try {
      const filters = pick(req.query,adminFilterableFields)
      const options=pick(req.query,['limit','page','sortBy','sortOrder']);
      console.log(options);
      
       const result = await adminServices.getAllFromDB(filters, options)
     res.status(200).json({
        success:true,
        message: "Admin fached successfully",
        meta:result.meta,
        data: result.data
     })
    } catch (error) {
       res.status(500).json({
         success:false,
         message:error?.name || "Something went wrong",
         data: error
       })
    }
}
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await adminServices.getByIdFromDB(id);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data fetched by id!",
      data: result
  });
})


const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminService.updateIntoDB(id, req.body);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data updated!",
      data: result
  })
})
export const adminController={
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB
}