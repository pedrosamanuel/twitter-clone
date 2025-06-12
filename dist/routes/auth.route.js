"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_service_1 = require("../services/auth.service");
class AuthRoute {
    constructor() {
        this.router = express_1.default.Router();
        this.createRoutes();
    }
    createRoutes() {
        this.router.post('/register', this.register.bind(this));
        this.router.post('/login', this.login.bind(this));
        this.router.post('/logout', this.logout.bind(this));
    }
    async register(req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await auth_service_1.AuthService.register(username, password);
            res.status(201).json({ id: user.id, username: user.username });
        }
        catch (err) {
            next(err);
        }
    }
    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const { token, user } = await auth_service_1.AuthService.login(username, password);
            res
                .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 1000, // 1 día
                sameSite: 'lax',
                path: '/',
            })
                .status(200)
                .json({ message: 'Login exitoso', user: { id: user.id, username: user.username } });
        }
        catch (err) {
            next(err);
        }
    }
    async logout(_req, res, _next) {
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0), // Expira inmediatamente
            sameSite: 'lax',
            path: '/',
        });
        res.json({ message: 'Logout exitoso' });
    }
}
exports.default = new AuthRoute().router;
