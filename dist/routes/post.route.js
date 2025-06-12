"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_service_1 = __importDefault(require("../services/post.service"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const post_owner_middleware_1 = __importDefault(require("../middlewares/post.owner.middleware"));
class PostRoute {
    constructor() {
        this.router = express_1.default.Router();
        this.createRoutes();
    }
    createRoutes() {
        this.router.get('/posts', auth_middleware_1.authenticateJWT, this.getAllPosts.bind(this));
        this.router.get('/posts/:id', auth_middleware_1.authenticateJWT, this.getPostById.bind(this));
        this.router.post('/posts', auth_middleware_1.authenticateJWT, this.createPost.bind(this));
        this.router.put('/posts/:id', auth_middleware_1.authenticateJWT, post_owner_middleware_1.default, this.updatePost.bind(this));
        this.router.delete('/posts/:id', auth_middleware_1.authenticateJWT, post_owner_middleware_1.default, this.deletePost.bind(this));
    }
    getAllPosts(req, res, next) {
        post_service_1.default.getAllPosts()
            .then((result) => res.json(result))
            .catch((err) => next(err));
    }
    getPostById(req, res, next) {
        post_service_1.default.getPostById(req.params.id)
            .then((result) => res.json(result))
            .catch((err) => next(err));
    }
    createPost(req, res, next) {
        const userId = req.user.id;
        post_service_1.default.createPost({ ...req.body, userId })
            .then(result => res.status(201).json(result))
            .catch(next);
    }
    updatePost(req, res, next) {
        post_service_1.default.updatePost(req.params.id, req.body)
            .then((result) => res.json(result))
            .catch((err) => next(err));
    }
    deletePost(req, res, next) {
        post_service_1.default.deletePost(req.params.id)
            .then((result) => res.json(result))
            .catch((err) => next(err));
    }
}
exports.default = new PostRoute().router;
