import express, { Request, Response } from "express";
const router = express.Router();
import { Estate } from "../models/estate.model";
import { HouseEstate } from "../models/house.model";
import { ApartmentEstate } from "../models/apartment.model";
import { LandEstate } from "../models/land.model";

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
};

const createQuery = (queryParams: any) => {
  let query: any = {
    deal: queryParams.deal,
  };
  if (queryParams.extras) {
    query.extras = { $all: queryParams.extras };
  }
  if (queryParams.type) {
    query.type = { $in: queryParams.type };
  }
  if (queryParams.region) {
    query.region = queryParams.region;
  }
  if (queryParams.districts) {
    query.district = { $in: queryParams.districts };
  }
  if (queryParams.building_type) {
    query.building_type = { $in: queryParams.building_type };
  }
  setRangeQuery(query, queryParams, "price");
  setRangeQuery(query, queryParams, "area");
  setRangeQuery(query, queryParams, "floor");
  return query;
};

router.post("/houses", async (req: Request, res: Response) => {
  try {
    const limit = req.body.limit;
    const skip = (req.body.page - 1) * limit;

    const data = await HouseEstate.find(createQuery(req.body.filter))
      .skip(skip)
      .limit(limit)
      .exec();
    const count = await HouseEstate.count(createQuery(req.body.filter)).exec();
    return res
      .status(200)
      .json({ data: data, count: Math.ceil(count / limit) });
  } catch (err) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;
    res.status(500).json("Error getting search results: " + message);
  }
});

router.post("/apartments", async (req: Request, res: Response) => {
  try {
    const limit = req.body.limit;
    const skip = (req.body.page - 1) * limit;

    const data = await ApartmentEstate.find(createQuery(req.body.filter))
      .skip(skip)
      .limit(limit)
      .exec();
    const count = await ApartmentEstate.count(
      createQuery(req.body.filter),
    ).exec();
    return res
      .status(200)
      .json({ data: data, count: Math.ceil(count / limit) });
  } catch (err) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;
    res.status(500).json("Error getting search results: " + message);
  }
});

router.post("/land", async (req: Request, res: Response) => {
  try {
    const limit = req.body.limit;
    const skip = (req.body.page - 1) * limit;

    const data = await LandEstate.find(createQuery(req.body.filter))
      .skip(skip)
      .limit(limit)
      .exec();
    const count = await LandEstate.count(createQuery(req.body.filter)).exec();
    return res
      .status(200)
      .json({ data: data, count: Math.ceil(count / limit) });
  } catch (err) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;
    res.status(500).json("Error getting search results: " + message);
  }
});

router.post("/listing", async (req: Request, res: Response) => {
  try {
    const data = await Estate.findById(req.body.id).exec();
    return res.status(200).json(data);
  } catch (err) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;
    res.status(500).json("Error getting search results: " + message);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await Estate.find().limit(12).sort({ updatedAt: -1 });
    return res.status(200).json(data);
  } catch (err) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;
    res.status(500).json("Error getting search results: " + message);
  }
});

export { router as searchRouter };
