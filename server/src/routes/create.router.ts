import express, { Request, Response } from "express";
const router = express.Router();
import { House } from "../models/house.model";
import { Apartment } from "../models/apartment.model";
import { Land } from "../models/land.model";

router.post("/house", async (req: Request, res: Response) => {
    const reqEstate = new House(req.body);
    try {
        const result = await reqEstate.save();
        res.status(201).json(result);
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        res.status(500).json("Error creating house: " + message);
    }
});

router.post("/apartment", async (req: Request, res: Response) => {
    const reqEstate = new Apartment(req.body);
    try {
        const result = await reqEstate.save();
        res.status(201).json(result);
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        res.status(500).json("Error creating apartment: " + message);
    }
});

router.post("/land", async (req: Request, res: Response) => {
    const reqEstate = new Land(req.body);
    try {
        const result = await reqEstate.save();
        res.status(201).json(result);
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        res.status(500).json("Error creating land: " + message);
    }
});

export { router as createRouter };