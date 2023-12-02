import express, { Request, Response } from "express";
const router = express.Router();
import { Estate } from "../models/estate.model";

router.post("/search", async (req: Request, res: Response) => {
    try {
        const data = await Estate.find();
        return res.status(200).send(data);
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        res.status(500).send("Error getting search results: " + message);
    }
});

router.post("/create", async (req: Request, res: Response) => {
    const reqEstate = new Estate(req.body);
    try {
        const result = await reqEstate.save();
        res.status(201).send(result);
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        res.status(500).send("Error creating lead: " + message);
    }
});

export { router as estateRouter };