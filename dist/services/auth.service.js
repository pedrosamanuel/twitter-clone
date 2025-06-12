"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../data/models/User");
class AuthService {
    static async register(username, password) {
        try {
            const hashPassowrd = await bcrypt_1.default.hash(password, 10);
            const user = await User_1.User.create({ username: username, password: hashPassowrd });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    static async login(username, password) {
        const user = await User_1.User.findOne({ where: { username } });
        if (!user)
            throw new Error('Usuario no encontrado');
        const valid = await bcrypt_1.default.compare(password, user.password);
        if (!valid)
            throw new Error('Contraseña incorrecta');
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return { token, user };
    }
}
exports.AuthService = AuthService;
exports.default = AuthService;
