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
exports.testingRouter = void 0;
const express_1 = __importDefault(require("express"));
const testingUtils_1 = require("../utils/testingUtils");
const router = express_1.default.Router();
exports.testingRouter = router;
router.post("/reset-database", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, testingUtils_1.cleanDatabase)();
        yield (0, testingUtils_1.seedDatabase)();
        res.status(200).json("Database reset was successful.");
    }
    catch (err) {
        let message = "Unknown error";
        if (err instanceof Error)
            message = err.message;
        res.status(500).json("Error resetting database: " + message);
    }
}));
router.post("/clean-database", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, testingUtils_1.cleanDatabase)();
        res.status(200).json("Database reset was successful.");
    }
    catch (err) {
        let message = "Unknown error";
        if (err instanceof Error)
            message = err.message;
        res.status(500).json("Error resetting database: " + message);
    }
}));
