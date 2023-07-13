import  jwt from 'jsonwebtoken';
import { UserDocument } from "../models/user.model";

import  config  from "config";
interface Option{
    expiresIn:string,

}
interface Payload{
    user:UserDocument["_id"]
}

export function singJWT(object:Payload,option:Option ){
    return jwt.sign(object,config.get<string>("privetKey"),{
        ...option,
    algorithm:"HS256"   });
}

export function verify(token:string){
    try{
        
        const decoded=jwt.verify(token,config.get<string>("privetKey"));
        return {
            valid:true,
            expired:false,
            decoded:decoded,
        }
    }catch(e:any){
        return {
            valid:false,
            expired:e.message==="jwt expired",
            decoded:null
        }
    }

}

