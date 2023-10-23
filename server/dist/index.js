"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
if (process.env.DATABASE_URL == undefined)
    throw new Error("DATABASE_URL is not set");
const express_1 = __importDefault(require("express"));
const lead_router_1 = require("./routes/lead.router");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
mongoose_1.default.connect(process.env.DATABASE_URL);
const db = mongoose_1.default.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(lead_router_1.leadRouter);
app.listen(port, () => { console.log("Server started on port " + port); });
