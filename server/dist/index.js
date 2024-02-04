"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const search_router_1 = require("./routes/search.router");
const create_router_1 = require("./routes/create.router");
const testing_router_1 = require("./routes/testing.router");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
const enviroment = (_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : "prod";
const database_uri = enviroment === "test"
    ? process.env.DATABASE_TEST_URI
    : process.env.DATABASE_URI;
if (!database_uri) {
    console.error("Database URI is missing.");
    process.exit(1);
}
mongoose_1.default.connect(database_uri);
const db = mongoose_1.default.connection;
db.on("error", (error) => {
    console.error(error);
    process.exit(1);
});
db.once("open", () => console.log("Connected to database"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/search", search_router_1.searchRouter);
app.use("/create", create_router_1.createRouter);
if (enviroment === "test") {
    app.use("/testing", testing_router_1.testingRouter);
}
app.listen(port, () => {
    console.log("Server started on port " + port);
});
