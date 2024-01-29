"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandEstate = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const estate_model_1 = require("./estate.model");
const LandEstate = estate_model_1.Estate.discriminator(
  "Land",
  new mongoose_1.default.Schema({
    type: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(housing|commercial|field|forest|pond|garden)$/.test(v);
        },
      },
    },
  }),
);
exports.LandEstate = LandEstate;
