

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
    // console.log("login service", isCorrectPassword);

if(!isCorrectPassword){
    throw new Error("password incorrect")
}
    const accessToken= jwt.sign({
        email:userData.email,
        role: userData.role
    },
  'fghgjkhgjf',
  
    {
        algorithm:"HS256",
        expiresIn:"15m"
    }
) 
// console.log(accessToken);
const refreshToken= jwt.sign({
    email:userData.email,
    role: userData.role
},
'fghgjkhgjfhgdhgghhg',

{
    algorithm:"HS256",
    expiresIn:"30d"
}
) 


    return {
        accessToken,
        refreshToken,
        needPasswordChange:userData.needPasswordChange
    }
}


const refreshToken= async()=>{
    console.log('refresh token');
    
}




export const authServices={
    loginUser,
    refreshToken
}