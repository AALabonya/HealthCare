import { Prisma, PrismaClient } from "@prisma/client"
import { object } from "zod";
import { adminSearchFields } from "./admin.constant";

const prisma =new PrismaClient()
const getAllFromDB= async(params:any, options:any)=>{
    const {limit,page}= options
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
        skip: (Number(page)-1)* limit,
        take:Number(limit),
        orderBy:options.sortBy && options.sortOrder ?{
            [options.sortBy]:options.sortOrder
        }:{
            createdAt:'desc'
        }
    })

    return result
}

export const adminServices={
    getAllFromDB
}