import mongoose from "mongoose";
import { ApartmentEstate } from "../models/apartment.model";
import apartments from "./testingApartments.json";

export async function cleanDatabase() {
  try {
    const modelNames = mongoose.modelNames();
    await Promise.all(
      modelNames.map(async (modelName) => {
        const model = mongoose.model(modelName);
        await model.deleteMany({});
      }),
    );
  } catch (err) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;
    console.error("Error cleaning database: " + message);
  }
}

export async function seedDatabase() {
  try {
    await ApartmentEstate.create(apartments);
  } catch (err) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;
    console.error("Error seeding database: " + message);
  }
}
