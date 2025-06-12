"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/like.service.ts
const Like_1 = require("../data/models/Like");
class LikeService {
    static async createLike(data) {
        const existingLike = await Like_1.Like.findOne({
            where: {
                userId: data.userId,
                postId: data.postId,
            },
        });
        if (existingLike) {
            throw new Error('El usuario ya le dio like a este post');
        }
        return await Like_1.Like.create(data);
    }
    static async deleteLike(id) {
        const like = await Like_1.Like.findByPk(id);
        if (!like)
            throw new Error('Like no encontrado');
        await like.destroy();
        return { message: 'Like eliminado correctamente' };
    }
}
exports.default = LikeService;
