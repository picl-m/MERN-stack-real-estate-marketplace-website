import mongoose from "mongoose";

import locations from "./locations.json";
const regions = Object.keys(locations);
let districts: Array<string> = [];

regions.forEach((region) => {
    locations[region as keyof typeof locations].forEach((district) => {
        districts.push(district);
    })
})

const leadSchema = new mongoose.Schema({
    estateType: {
        type: String,
        required: true,
        validate: {
            validator: function(v: string) {
                return /^(apartment|house|land)$/.test(v);
            }
        }
    },
    fullName: {
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
    }
});

const Lead = mongoose.model("Lead", leadSchema);

export { Lead };