import mongoose from "mongoose";
import { Estate } from "./estate.model";

const LandEstate = Estate.discriminator(
  "Land",
  new mongoose.Schema({
    type: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^(housing|commercial|field|forest|pond|garden)$/.test(v);
        },
      },
    },
  }),
);

export { LandEstate };
