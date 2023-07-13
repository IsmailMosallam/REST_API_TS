import { z ,TypeOf} from "zod"
export const createSessionSchema=z.object({
    body:z.object({
        email:z.string({
            required_error:"password is required"
        }).email({message:"Not valid Email"}),

        password:z.string({
            required_error:"password is required"
        }),
    }),})
   
