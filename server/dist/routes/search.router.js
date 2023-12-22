"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.searchRouter = router;
const estate_model_1 = require("../models/estate.model");
const house_model_1 = require("../models/house.model");
const apartment_model_1 = require("../models/apartment.model");
const land_model_1 = require("../models/land.model");
const setRangeQuery = (query, queryParams, param) => {
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
const createQuery = (queryParams) => {
    let query = {
        deal: queryParams.deal
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
router.post("/houses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.body.limit;
        const skip = (req.body.page - 1) * limit;
        const data = yield house_model_1.HouseEstate.find(createQuery(req.body.filter)).skip(skip).limit(limit).exec();
        const count = yield house_model_1.HouseEstate.count(createQuery(req.body.filter)).exec();
        return res.status(200).json({ data: data, count: Math.ceil(count / limit) });
    }
    catch (err) {
        let message = "Unknown error";
        if (err instanceof Error)
            message = err.message;
        res.status(500).json("Error getting search results: " + message);
    }
}));
router.post("/apartments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.body.limit;
        const skip = (req.body.page - 1) * limit;
        const data = yield apartment_model_1.ApartmentEstate.find(createQuery(req.body.filter)).skip(skip).limit(limit).exec();
        const count = yield apartment_model_1.ApartmentEstate.count(createQuery(req.body.filter)).exec();
        return res.status(200).json({ data: data, count: Math.ceil(count / limit) });
    }
    catch (err) {
        let message = "Unknown error";
        if (err instanceof Error)
            message = err.message;
        res.status(500).json("Error getting search results: " + message);
    }
}));
router.post("/land", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.body.limit;
        const skip = (req.body.page - 1) * limit;
        const data = yield land_model_1.LandEstate.find(createQuery(req.body.filter)).skip(skip).limit(limit).exec();
        const count = yield land_model_1.LandEstate.count(createQuery(req.body.filter)).exec();
        return res.status(200).json({ data: data, count: Math.ceil(count / limit) });
    }
    catch (err) {
        let message = "Unknown error";
        if (err instanceof Error)
            message = err.message;
        res.status(500).json("Error getting search results: " + message);
    }
}));
router.post("/listing", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield estate_model_1.Estate.findById(req.body.id).exec();
        return res.status(200).json(data);
    }
    catch (err) {
        let message = "Unknown error";
        if (err instanceof Error)
            message = err.message;
        res.status(500).json("Error getting search results: " + message);
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield estate_model_1.Estate.find().limit(12).sort({ updatedAt: -1 });
        return res.status(200).json(data);
    }
    catch (err) {
        let message = "Unknown error";
        if (err instanceof Error)
            message = err.message;
        res.status(500).json("Error getting search results: " + message);
    }
}));
