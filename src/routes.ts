import { Express,Request,Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { createSessionHandler } from "./controller/session.controller";
import validate from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createSessionSchema } from "./schema/session.schema";
function router(app:Express){
    app.get("/helthcheck",(req:Request,res:Response)=>{
        res.sendStatus(200);
    })
    app.post('/api/user',validate(createUserSchema) ,createUserHandler)
    app.post('/api/session',validate(createSessionSchema) ,createSessionHandler)

}
export default router;