import mongoose from "mongoose";

import locations from "./locations.json";
const regions = Object.keys(locations);
let districts: Array<string> = [];

regions.forEach((region) => {
    locations[region as keyof typeof locations].forEach((district) => {
        districts.push(district);
    })
})

const apartmentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        validate: {
            validator: function(v: string) {
                return /^(1+kt|1+1|2+kt|2+1|3+kk|3+1|4+kk|4+1|5 and more)$/.test(v);
            }
        },
    },
    extras: [{
        type: String,
        required: true,
        validate: {
            validator: function(v: string) {
                return /^(balcony|parking|garage|lift|furnished)$/.test(v);
            }
        },
    }],
    building_type: {
        type: String,
        required: true,
        validate: {
            validator: function(v: string) {
                return /^(brick|panel|steel)$/.test(v);
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
    floor: {
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
});

const Apartment = mongoose.model("Apartment", apartmentSchema);

export { Apartment };