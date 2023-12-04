"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.House = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const locations_json_1 = __importDefault(require("./locations.json"));
const regions = Object.keys(locations_json_1.default);
let districts = [];
regions.forEach((region) => {
    locations_json_1.default[region].forEach((district) => {
        districts.push(district);
    });
});
const houseSchema = new mongoose_1.default.Schema({
    deal: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(sale|rent)$/.test(v);
            }
        },
    },
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
    price: {
        type: Number,
        required: true,
    },
    area: {
        type: Number,
        required: true,
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
    },
    full_name: {
        type: String,
        required: true,
        maxlenght: 70,
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
        maxlenght: 70,
        validate: {
            validator: function (v) {
                return /^(.+)@(.+){2,}\.(.+){2,}$/.test(v);
            }
        }
    },
});
const House = mongoose_1.default.model("House", houseSchema);
exports.House = House;
