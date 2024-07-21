import { Request, Response, Router } from "express";

const router: Router = Router()

router.get('/',async (req : Request, res : Response) => {
    res.status(200).send("Problems API");
})

export default router