import { Router, Request, Response } from 'express'
import { createHash } from "crypto";
import User from "../models/User";
import jwt from 'jsonwebtoken';

const router: Router = Router()


function checkAuthorization(req : Request, res : Response, next: () => void) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Invalid authorization header format' });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY!)
    if (verified) next()
    else return res.status(403).json({ message: 'Invalid token' });
    
}

router.get('/',async (req : Request, res : Response) => {
    res.status(200).send("User API");
})

router.get('/:userId',async (req : Request, res : Response) => {
    const result = await User.findById(req.params.userId).lean()
    if (result) res.status(200).send({...result,Password:""})
    else res.status(404).send(`No user ${req.params.userId}`)
})

router.post('/:userId/login', async (req : Request, res : Response) => {
    const result = await User.findById(req.params.userId).lean()
    if (!result) res.status(404).send(`No user ${req.params.userId}`)
        
    const resultPasswordHidden = {...result,Password:""}

    const {pwd} = req.body;
    const hash  = createHash('sha256').update(pwd).digest('hex')

    if (result!.Password === hash){
        const jwtSecretKey = process.env.JWT_SECRET_KEY!;
        const token = jwt.sign(resultPasswordHidden,jwtSecretKey)
        res.status(200).send({token})
    }
    else res.status(401).send(`Wrong Credentials`)
})

export default router