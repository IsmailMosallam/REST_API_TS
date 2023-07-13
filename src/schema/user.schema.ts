import { z ,TypeOf} from "zod"
export const createUserSchema=z.object({
    body:z.object({
        name:z.string({
            required_error:"Name is required"
        }),
        email:z.string().email({message:"Not valid Email"}),

        password:z.string({
            required_error:"password is required"
        }).min(6,"password too short - should be 6 chars minimum "),

        passwordConfirmation:z.string({
            required_error:"password Confirmation is required"
        })

    }).refine((data)=> data.password ===data.passwordConfirmation,{
        message:"password do not match",
        path:["passwordConfirmation"]
    })

});
export type createUserInput=Omit<TypeOf<typeof createUserSchema>,"body.passwordConfirmation">