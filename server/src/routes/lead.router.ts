import express, { Request, Response } from "express";
const router = express.Router();
import { Lead } from "../models/lead.model";

router.get("/leads", async (req: Request, res: Response) => {
    try {
        const data = await Lead.find();
        return res.status(200).send(data);
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        res.status(500).send("Error getting leads: " + message);
    }
});

router.post("/lead", async (req: Request, res: Response) => {
    const reqLead = new Lead(req.body);
    try {
        const result = await reqLead.save();
        res.status(201).send(result);
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        res.status(500).send("Error creating lead: " + message);
    }
});

export { router as leadRouter };