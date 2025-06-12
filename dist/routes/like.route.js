"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/like.route.ts
const express_1 = __importDefault(require("express"));
const like_service_1 = __importDefault(require("../services/like.service"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
class LikeRoute {
    constructor() {
        this.router = express_1.default.Router();
        this.createRoutes();
    }
    createRoutes() {
        this.router.post('/likes', auth_middleware_1.authenticateJWT, this.createLike.bind(this));
        this.router.delete('/likes/:id', auth_middleware_1.authenticateJWT, this.deleteLike.bind(this));
    }
    async createLike(req, res, next) {
        const userId = req.user.id;
        like_service_1.default.createLike({ userId, postId: parseInt(req.body.postId) })
            .then((result) => res.json(result))
            .catch((err) => next(err));
    }
    async deleteLike(req, res, next) {
        like_service_1.default.deleteLike(parseInt(req.params.id))
            .then((result) => res.json(result))
            .catch((err) => next(err));
    }
}
exports.default = new LikeRoute().router;
