import Partial from "mongoose";
import { Omit, omit } from "lodash";
import UserModel,{ UserDocument } from "../models/user.model";
import bcrypt from 'bcrypt'

export async function createUser(input:Partial<Omit<UserDocument,"createdAt"|"updatedAt"|"comparePassword">>){
    try{
        const user= await UserModel.create(input)
        return omit(user.toJSON(),"password")
    }catch(e:any){
        throw new Error(e.message)

    }
}

export async function validatePassword({email,password}:{email:string,password:string}){
    try{
        const user = await UserModel.findOne({ email });
        if(!user) return false;
        const isMatch = await user.comparePassword(password)
        if(!isMatch) return false
    
     return omit(user.toJSON(),"password")
    }catch(e:any){
        throw new Error(e.message)
    }
}

