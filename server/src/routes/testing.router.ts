import express, { Request, Response } from "express";
import { cleanDatabase, seedDatabase } from "../utils/testingUtils";
const router = express.Router();

router.post("/reset-database", async (req: Request, res: Response) => {
  try {
    await cleanDatabase();
    await seedDatabase();
    res.status(200).json("Database reset was successful.");
  } catch (err) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;
    res.status(500).json("Error resetting database: " + message);
  }
});

router.post("/clean-database", async (req: Request, res: Response) => {
  try {
    await cleanDatabase();
    res.status(200).json("Database reset was successful.");
  } catch (err) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;
    res.status(500).json("Error resetting database: " + message);
  }
});

export { router as testingRouter };
