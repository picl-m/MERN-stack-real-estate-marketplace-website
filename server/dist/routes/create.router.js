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
exports.createRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.createRouter = router;
const house_model_1 = require("../models/house.model");
const apartment_model_1 = require("../models/apartment.model");
const land_model_1 = require("../models/land.model");
router.post("/house", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqEstate = new house_model_1.House(req.body);
    try {
        const result = yield reqEstate.save();
        res.status(201).send(result);
    }
    catch (err) {
        let message = "Unknown error";
        if (err instanceof Error)
            message = err.message;
        res.status(500).send("Error creating house: " + message);
    }
}));
router.post("/apartment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqEstate = new apartment_model_1.Apartment(req.body);
    try {
        const result = yield reqEstate.save();
        res.status(201).send(result);
    }
    catch (err) {
        let message = "Unknown error";
        if (err instanceof Error)
            message = err.message;
        res.status(500).send("Error creating apartment: " + message);
    }
}));
router.post("/land", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqEstate = new land_model_1.Land(req.body);
    try {
        const result = yield reqEstate.save();
        res.status(201).send(result);
    }
    catch (err) {
        let message = "Unknown error";
        if (err instanceof Error)
            message = err.message;
        res.status(500).send("Error creating land: " + message);
    }
}));
