import express, { Request, Response } from "express";
const router = express.Router();
import { HouseEstate } from "../models/house.model";
import { ApartmentEstate } from "../models/apartment.model";
import { LandEstate } from "../models/land.model";

router.post("/houses", async (req: Request, res: Response) => {
  const reqEstate = new HouseEstate(req.body);
  try {
    const result = await reqEstate.save();
    res.status(201).json(result);
  } catch (err) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;
    res.status(500).json("Error creating house: " + message);
  }
});

router.post("/apartments", async (req: Request, res: Response) => {
  const reqEstate = new ApartmentEstate(req.body);
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
  const reqEstate = new LandEstate(req.body);
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
