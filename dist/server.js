"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_1 = __importDefault(require("./routes/api"));
dotenv_1.default.config();
if (dotenv_1.default.config().error) {
    console.log("Cannot load .env file");
    process.exit(1);
}
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use('/v1', api_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
