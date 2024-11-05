import { PrismaClient, UserRole } from "@prisma/client"

const prisma = new PrismaClient()
const createAdmin = async(data:any)=>{
   const userData={
    email:data.admin.email,
    password: data.password,
    role: UserRole.Admin
   }

   const result = await prisma.$transaction(async(transactionClient)=>{
    const createdUserData= await transactionClient.user.create({
        data:userData
    })
    const createAdminData= await transactionClient.admin.create({
        data:data.admin
    })
    return createAdminData
   })
    return result
}

export const userService ={
    createAdmin
}