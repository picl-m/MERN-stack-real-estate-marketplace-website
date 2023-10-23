"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lead = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const locations_json_1 = __importDefault(require("./locations.json"));
const regions = Object.keys(locations_json_1.default);
let districts = [];
regions.forEach((region) => {
    locations_json_1.default[region].forEach((district) => {
        districts.push(district);
    });
});
const leadSchema = new mongoose_1.default.Schema({
    estateType: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(apartment|house|land)$/.test(v);
            }
        }
    },
    fullName: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(.+){2,} (.+){2,}$/.test(v);
            }
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{9}$/.test(v);
            }
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(.+)@(.+){2,}\.(.+){2,}$/.test(v);
            }
        }
    },
    region: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                let isValid = false;
                for (let i = 0; i < regions.length; i++) {
                    if (v === regions[i]) {
                        isValid = true;
                        break;
                    }
                }
                return isValid;
            }
        }
    },
    district: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                let isValid = false;
                for (let i = 0; i < districts.length; i++) {
                    if (v === districts[i]) {
                        isValid = true;
                        break;
                    }
                }
                return isValid;
            }
        }
    }
});
const Lead = mongoose_1.default.model("Lead", leadSchema);
exports.Lead = Lead;
