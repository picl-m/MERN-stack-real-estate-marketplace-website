import mongoose from "mongoose";

import locations from "./locations.json";
const regions = Object.keys(locations);
let districts: Array<string> = [];

regions.forEach((region) => {
    locations[region as keyof typeof locations].forEach((district) => {
        districts.push(district);
    })
})

const estateSchema = new mongoose.Schema({
    deal: {
        type: String,
        required: true,
        validate: {
            validator: function(v: string) {
                return /^(sale|rent)$/.test(v);
            }
        },
    },
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
            validator: function(v: string) {
                let isValid = false;
                for(let i = 0; i < regions.length; i++) {
                    if(v === regions[i]) {
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
            validator: function(v: string) {
                let isValid = false;
                for(let i = 0; i < districts.length; i++) {
                    if(v === districts[i]) {
                        isValid = true;
                        break;
                    }
                }
                return isValid;
            }
        }
    },
    description: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true,
        maxlenght: 70,
        validate: {
            validator: function(v: string) {
                return /^(.+){2,} (.+){2,}$/.test(v);
            }
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v: string) {
                return /^\d{9}$/.test(v);
            }
        }
    },
    email: {
        type: String,
        required: true,
        maxlenght: 70,
        validate: {
            validator: function(v: string) {
                return /^(.+)@(.+){2,}\.(.+){2,}$/.test(v);
            }
        }
    },
});

const Estate = mongoose.model("Estate", estateSchema);

export { Estate };