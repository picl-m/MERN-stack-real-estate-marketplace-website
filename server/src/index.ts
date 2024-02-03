require("dotenv").config();

import express from "express";
import { searchRouter } from "./routes/search.router";
import { createRouter } from "./routes/create.router";
import { testingRouter } from "./routes/testing.router";
import mongoose, { MongooseError } from "mongoose";
import cors from "cors";

import { Estate } from "./models/estate.model";

const app = express();
const port = process.env.PORT ?? 5000;
const enviroment = process.env.NODE_ENV ?? "prod";
const database_uri =
  enviroment === "test"
    ? process.env.DATABASE_TEST_URI
    : process.env.DATABASE_URI;

if (!database_uri) {
  console.error("Database URI is missing.");
  process.exit(1);
}

mongoose.connect(database_uri);
const db = mongoose.connection;

db.on("error", (error: MongooseError) => console.log(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());
app.use(cors());
app.use("/search", searchRouter);
app.use("/create", createRouter);

if (enviroment === "test") {
  app.use("/testing", testingRouter);
}

app.listen(port, () => {
  console.log("Server started on port " + port);
});
