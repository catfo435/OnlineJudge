const express = require('express');
import { Request, Response } from "express";
const router = express.Router();

router.get('/',async (req : Request, res : Response) => {
    res.status(200).send("Administrator API");
})

module.exports = router