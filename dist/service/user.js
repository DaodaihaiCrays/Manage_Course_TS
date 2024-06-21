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
exports.loginService = exports.registerService = void 0;
const database_1 = __importDefault(require("../config/database"));
const user_1 = require("../models/user");
const util_1 = require("../util/util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (dotenv_1.default.config().error) {
    console.log("Cannot load .env file");
    process.exit(1);
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.initialize();
    }
    catch (error) {
        console.log("Cannot connect to database", error);
        process.exit(1);
    }
}))();
const registerService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = database_1.default.getRepository(user_1.User);
    const email = userData.email;
    const user = yield repository.createQueryBuilder("user")
        .where("email = :email", { email })
        .getOne();
    if (user || !(0, util_1.validateEmail)(email)) {
        return 1;
    }
    const hashedPassword = yield (0, util_1.hashPassword)(userData.passwordSalt);
    const userNew = database_1.default.getRepository(user_1.User)
        .create({
        email: userData.email,
        passwordSalt: hashedPassword,
        pictureUrl: userData.pictureUrl,
        isAdmin: userData.isAdmin
    });
    yield repository.save(userNew);
    return 0;
});
exports.registerService = registerService;
const loginService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = database_1.default.getRepository(user_1.User);
    const email = userData.email;
    if (!(0, util_1.validateEmail)(email))
        return false;
    const user = yield repository.createQueryBuilder("user")
        .where("email = :email", { email })
        .getOne();
    console.log(user);
    if (!user) {
        return null;
    }
    const checkPass = yield (0, util_1.comparePassword)(userData.password, user.passwordSalt);
    if (checkPass) {
        const token = jsonwebtoken_1.default.sign({
            email: email,
            id: user['id']
        }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRE });
        return token;
    }
    return null;
});
exports.loginService = loginService;
