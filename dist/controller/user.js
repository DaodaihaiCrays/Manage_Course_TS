"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthController = exports.loginController = exports.registerController = void 0;
const user_1 = require("../service/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(typeof req.body)
        const result = yield (0, user_1.registerService)(req.body);
        if (result == 0) {
            res.status(200).json({
                success: {
                    code: 200,
                    message: "Success",
                }
            });
        }
        else {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot register"
                }
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                message: "An error occurred while createing an user"
            }
        });
    }
});
exports.registerController = registerController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(typeof req.body)
        const result = yield (0, user_1.loginService)(req.body);
        if (result) {
            res.status(200).json({
                success: {
                    code: 200,
                    message: "Success",
                    data: result
                }
            });
        }
        else {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Email or password is wrong."
                }
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                message: "An error occurred while login"
            }
        });
    }
});
exports.loginController = loginController;
const checkAuthController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        return res.status(400).json({
            error: {
                code: 400,
                message: "Invalid or expired token provided!"
            }
        });
    }
});
exports.checkAuthController = checkAuthController;
