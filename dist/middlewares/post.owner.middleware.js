"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_service_1 = __importDefault(require("../services/post.service"));
const authorizePostOwner = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postId = req.params.id;
        const post = await post_service_1.default.getPostById(postId);
        if (!post)
            res.status(404).json({ message: 'Post no encontrado' });
        if (post?.userId !== parseInt(userId)) {
            res.status(403).json({ message: 'No autorizado para modificar este post' });
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = authorizePostOwner;
