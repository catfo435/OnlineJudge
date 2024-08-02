import { Router, Request, Response } from 'express'
import { createHash } from "crypto";
import User from "../models/User";
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const router: Router = Router()


function checkAuthorization(req : Request, res : Response, next: () => void) {
    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({ message: 'Authorization Token Cookie missing' });
    }

    try{
        jwt.verify(token, process.env.JWT_SECRET_KEY!)
        next()
    }
    catch(e){
        res.cookie("token","",{
            expires : new Date(Date.now() - 1) //sets the cookie to expiry
        })
        if (e instanceof TokenExpiredError) return res.status(401).send({ message: 'Token Expired, Login in Again' });
        else return res.status(403).send({ message: 'Invalid token' });
    }
    
}

router.get('/',checkAuthorization,async (req : Request, res : Response) => {
    res.status(200).send("User API");
})

router.get('/:userId',async (req : Request, res : Response) => {
    const result = await User.findById(req.params.userId).lean()
    if (result) res.status(200).send({...result,Password:""})
    else res.status(404).send(`No user ${req.params.userId}`)
})

router.post('/login', async (req : Request, res : Response) => {
    const {Username, Password} = req.body
    const result = await User.findOne({User : Username}).lean()
    if (!result) {
        res.status(404).send(`No user ${req.params.userId}`)
        return
    }
        
    const resultPasswordHidden = {...result,Password:""}

    if (result!.Password === Password){
        const jwtSecretKey = process.env.JWT_SECRET_KEY!;
        const token = jwt.sign(resultPasswordHidden,jwtSecretKey)
        res.cookie("token",token,{
            expires : new Date(Date.now() + 3600*1000),
            path : "/",
            httpOnly : true,
            sameSite : "lax"
        })
        res.send("Login Successful")
    }
    else res.status(401).send(`Wrong Credentials`)
})

export default router