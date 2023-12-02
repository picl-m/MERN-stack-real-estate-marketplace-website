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
exports.estateRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.estateRouter = router;
const estate_model_1 = require("../models/estate.model");
router.post("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield estate_model_1.Estate.find();
        return res.status(200).send(data);
    }
    catch (err) {
        let message = "Unknown error";
        if (err instanceof Error)
            message = err.message;
        res.status(500).send("Error getting search results: " + message);
    }
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqEstate = new estate_model_1.Estate(req.body);
    try {
        const result = yield reqEstate.save();
        res.status(201).send(result);
    }
    catch (err) {
        let message = "Unknown error";
        if (err instanceof Error)
            message = err.message;
        res.status(500).send("Error creating lead: " + message);
    }
}));
