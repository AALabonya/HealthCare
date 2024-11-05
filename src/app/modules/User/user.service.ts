import { PrismaClient, UserRole } from "@prisma/client"

const prisma = new PrismaClient()
const createAdmin = async(data:any)=>{
   const userData={
    email:data.admin.email,
    password: data.password,
    role: UserRole.Admin
   }
    return {
        message:"admin create"
    }
}

export const userService ={
    createAdmin
}