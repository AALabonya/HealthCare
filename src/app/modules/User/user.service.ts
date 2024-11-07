import { PrismaClient, UserRole } from "@prisma/client"
import * as bcrypt from 'bcrypt'
const prisma = new PrismaClient()

const createAdmin = async(data:any)=>{
   
  const hashedPassword: string = await bcrypt.hash(data.password, 12)   
   
    const userData={
    email:data.admin.email,
    password: hashedPassword,
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