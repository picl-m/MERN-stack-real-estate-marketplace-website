"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseEstate = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const estate_model_1 = require("./estate.model");
const HouseEstate = estate_model_1.Estate.discriminator("House", new mongoose_1.default.Schema({
    type: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(1 room|2 rooms|3 rooms|4 rooms|5 rooms and more)$/.test(v);
            }
        },
    },
    extras: [{
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^(balcony|parking|garden|basement|garage|wooden|furnished)$/.test(v);
                }
            },
        }],
}));
exports.HouseEstate = HouseEstate;
