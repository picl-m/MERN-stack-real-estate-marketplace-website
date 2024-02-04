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
exports.seedDatabase = exports.cleanDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const apartment_model_1 = require("../models/apartment.model");
const testingApartments_json_1 = __importDefault(require("./testingApartments.json"));
function cleanDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const modelNames = mongoose_1.default.modelNames();
            yield Promise.all(modelNames.map((modelName) => __awaiter(this, void 0, void 0, function* () {
                const model = mongoose_1.default.model(modelName);
                yield model.deleteMany({});
            })));
        }
        catch (err) {
            let message = "Unknown error";
            if (err instanceof Error)
                message = err.message;
            console.error("Error cleaning database: " + message);
        }
    });
}
exports.cleanDatabase = cleanDatabase;
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield apartment_model_1.ApartmentEstate.create(testingApartments_json_1.default);
        }
        catch (err) {
            let message = "Unknown error";
            if (err instanceof Error)
                message = err.message;
            console.error("Error seeding database: " + message);
        }
    });
}
exports.seedDatabase = seedDatabase;
