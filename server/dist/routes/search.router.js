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
    console.log(queryParams);
    if (queryParams.extras) {
        query.extras = { $all: queryParams.extras };
    }
    setRangeQuery(query, queryParams, "price");
    setRangeQuery(query, queryParams, "area");
    setRangeQuery(query, queryParams, "floor");
    console.log(query);
    return query;
};
router.post("/houses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield house_model_1.House.find(createQuery(req.body)).exec();
        return res.status(200).json(data);
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
        const data = yield apartment_model_1.Apartment.find(req.body).exec();
        return res.status(200).json(data);
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
        const data = yield land_model_1.Land.find(req.body).exec();
        return res.status(200).json(data);
    }
    catch (err) {
        let message = "Unknown error";
        if (err instanceof Error)
            message = err.message;
        res.status(500).json("Error getting search results: " + message);
    }
}));
