import mongoose from "mongoose";
import { Estate } from "./estate.model";

const ApartmentEstate = Estate.discriminator(
  "Apartment",
  new mongoose.Schema({
    type: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^(1\+kt|1\+1|2\+kt|2\+1|3\+kk|3\+1|4\+kk|4\+1|5 and more)$/.test(
            v,
          );
        },
      },
    },
    extras: [
      {
        type: String,
        required: true,
        validate: {
          validator: function (v: string) {
            return /^(balcony|parking|garage|lift|furnished)$/.test(v);
          },
        },
      },
    ],
    building_type: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^(brick|panel|steel)$/.test(v);
        },
      },
    },
    floor: {
      type: Number,
      required: true,
    },
  }),
);

export { ApartmentEstate };
