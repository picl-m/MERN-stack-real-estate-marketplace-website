"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentEstate = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const estate_model_1 = require("./estate.model");
const ApartmentEstate = estate_model_1.Estate.discriminator("Apartment", new mongoose_1.default.Schema({
    type: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(1\+kt|1\+1|2\+kt|2\+1|3\+kk|3\+1|4\+kk|4\+1|5 and more)$/.test(v);
            }
        },
    },
    extras: [{
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^(balcony|parking|garage|lift|furnished)$/.test(v);
                }
            },
        }],
    building_type: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(brick|panel|steel)$/.test(v);
            }
        },
    },
    floor: {
        type: Number,
        required: true,
    },
}));
exports.ApartmentEstate = ApartmentEstate;
