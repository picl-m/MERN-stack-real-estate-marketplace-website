import express, { Request, Response } from "express";
const router = express.Router();
import { House } from "../models/house.model";
import { Apartment } from "../models/apartment.model";
import { Land } from "../models/land.model";

const setRangeQuery = (query: any, queryParams: any, param: string) => {
    if (queryParams["min_" + param] || queryParams["max_" + param]) {
        query[param] = {};
        if (queryParams["min_" + param]) {
            query[param].$gte = queryParams["min_" + param];
        }
        if (queryParams["max_" + param]) {
            query[param].$lte = queryParams["max_" + param];
        }
    }
}

const createQuery = (queryParams: any) => {
    let query: any = {
        deal: queryParams.deal
    }
    console.log(queryParams)
    if (queryParams.extras) {
        query.extras = { $all: queryParams.extras };
    }

    setRangeQuery(query, queryParams, "price");
    setRangeQuery(query, queryParams, "area");
    setRangeQuery(query, queryParams, "floor");
    console.log(query)
    return query;
}

router.post("/houses", async (req: Request, res: Response) => {
    try {
        const data = await House.find( createQuery(req.body) ).exec();
        return res.status(200).json(data);
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        res.status(500).json("Error getting search results: " + message);
    }
});

router.post("/apartments", async (req: Request, res: Response) => {
    try {
        const data = await Apartment.find(req.body).exec();
        return res.status(200).json(data);
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        res.status(500).json("Error getting search results: " + message);
    }
});

router.post("/land", async (req: Request, res: Response) => {
    try {
        const data = await Land.find(req.body).exec();
        return res.status(200).json(data);
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        res.status(500).json("Error getting search results: " + message);
    }
});

export { router as searchRouter };