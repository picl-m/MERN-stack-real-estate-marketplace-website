import express, { Request, Response } from "express";
const router = express.Router();
import { House } from "../models/house.model";
import { Apartment } from "../models/apartment.model";
import { Land } from "../models/land.model";

router.post("/houses", async (req: Request, res: Response) => {
    try {
        const data = await House.find();
        return res.status(200).send(data);
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        res.status(500).send("Error getting search results: " + message);
    }
});

router.post("/apartments", async (req: Request, res: Response) => {
    try {
        const data = await Apartment.find();
        return res.status(200).send(data);
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        res.status(500).send("Error getting search results: " + message);
    }
});

router.post("/land", async (req: Request, res: Response) => {
    try {
        const data = await Land.find();
        return res.status(200).send(data);
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        res.status(500).send("Error getting search results: " + message);
    }
});

export { router as searchRouter };