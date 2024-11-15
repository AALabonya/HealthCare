import { log } from "console"

const loginUser= async(payload:{
    email:string,
    password:string
})=>{
    console.log("login service", payload);
    
}

export const authServices={
    loginUser
}