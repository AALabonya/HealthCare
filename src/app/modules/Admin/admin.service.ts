
import { adminSearchFields } from "./admin.constant";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";








const getAllFromDB= async(params:any, options:any)=>{
    const {limit,page, skip}= paginationHelper.calculatePagination(options)
const {searchTerm, ...filterData}=params
    const andConditions:Prisma.AdminWhereInput[] =[];
    // OR:[
    //     {
    //         name:{
    //             contains: params.searchTerm,
    //              mode:'insensitive'
    //         }
    //     },{
    //         email:{
    //             contains:params.searchTerm,
    //              mode:'insensitive'
    //         }
    //     }
    //    ]

    if(params.searchTerm){
        andConditions.push({
            OR:adminSearchFields.map(field=>({
                [field]:{
                    contains:params.searchTerm, 
             mode:'insensitive'}
            }))
        })
    }
    if(Object.keys(filterData).length >0){
        andConditions.push({
            AND:Object.keys(filterData).map(key =>({
                [key]:{
                    equals:filterData[key]
                }
            }))
        })
    }
    const whereConditions: Prisma.AdminWhereInput={AND: andConditions}
    const result = await prisma.admin.findMany({
        where:whereConditions,
        skip,
        take:limit,
        orderBy:options.sortBy && options.sortOrder ?{
            [options.sortBy]:options.sortOrder
        }:{
            createdAt:'desc'
        }
    })

    return {
       meta:{
        page,
        limit
       },
        data:result
    }
}

export const adminServices={
    getAllFromDB
}