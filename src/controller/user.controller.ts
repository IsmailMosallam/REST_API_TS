import {Request,Response}from 'express'
import logger from '../Utils/logger';
import { createUser } from '../services/user.service';
import { createUserInput } from '../schema/user.schema';
import { omit } from 'lodash';
export async function createUserHandler(req:Request <{},{},createUserInput["body"]>,res:Response){
    try{
    
const user=await createUser(req.body)
return res.status(200).send(user);

    }
    catch(e:any){
        logger.error(e.message);
        return res.status(409).send(e.message);
    }



} 