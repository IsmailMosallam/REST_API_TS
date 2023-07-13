import { Request, Response } from 'express'
import { validatePassword } from '../services/user.service'
import { createSession } from '../services/session.service';
import { singJWT, verify } from '../Utils/jwt.utils';



export async function createSessionHandler(req: Request, res: Response) {

    //validate the user password and email (user.services)
    const user = await validatePassword({ email: req.body.email, password: req.body.password });

    if (!user) {
        res.status(401).send("Invalid password or email");

    }

    //create session

    if (typeof user !== 'boolean') {
        const session = await createSession(user._id, req.get("user-agent") || " ")


        // create an Access Token 

        const accessSession = singJWT({ user: session._id }, {
            expiresIn: "15m"
        })

        //create a refresh Token" 

        const refreshSession = singJWT({ user: user._id },  { expiresIn: "15m"},)
        //return access and refresh
        return res.status(200).send({ accessSession, refreshSession });
    }

}