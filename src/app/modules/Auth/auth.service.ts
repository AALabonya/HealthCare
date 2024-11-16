

import prisma from "../../../shared/prisma";
import * as bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const loginUser= async(payload:{

    email:string,
    password:string
})=>{
    const userData = await prisma.user.findFirstOrThrow({
        where:{
            email:payload.email
        }
     
    })

    const isCorrectPassword:boolean = await bcrypt.compare(payload.password, userData.password)
    console.log("login service", isCorrectPassword);


    const jwtToken= jwt.sign({
        email:userData.email,
        role: userData.role
    },
  'fghgjkhgjf',
  
    {
        algorithm:"HS256",
        expiresIn:"15m"
    }
) 
console.log(jwtToken);



    return userData
}



export const authServices={
    loginUser
}