import mongoose from "mongoose";
import { Estate } from "./estate.model";

const HouseEstate = Estate.discriminator("House",
    new mongoose.Schema({
        type: {
            type: String,
            required: true,
            validate: {
                validator: function(v: string) {
                    return /^(1 room|2 rooms|3 rooms|4 rooms|5 rooms and more)$/.test(v);
                }
            },
        },
        extras: [{
            type: String,
            required: true,
            validate: {
                validator: function(v: string) {
                    return /^(balcony|parking|garden|basement|garage|wooden|furnished)$/.test(v);
                }
            },
        }],
    })
)

export { HouseEstate };