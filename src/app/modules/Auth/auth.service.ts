import { log } from "console"
import prisma from "../../../shared/prisma";

const loginUser= async(payload:{
    email:string,
    password:string
})=>{
    const userData = await prisma.user.findFirstOrThrow({
        where:{
            email:payload.email
        }
    })
    
    console.log("login service", payload);
    
}

export const authServices={
    loginUser
}