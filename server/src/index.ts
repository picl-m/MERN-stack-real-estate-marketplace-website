require("dotenv").config();
if (process.env.DATABASE_URL == undefined) throw new Error("DATABASE_URL is not set");

import express from "express";
import { leadRouter } from "./routes/lead.router";
import mongoose, { MongooseError } from "mongoose";
import cors from "cors";

const app = express();
const port = process.env.PORT ?? 5000;

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error: MongooseError) => console.log(error))
db.once("open", () => console.log("Connected to database"));

app.use(express.json());
app.use(cors());
app.use(leadRouter);

app.listen(port, () => {console.log("Server started on port " + port)});