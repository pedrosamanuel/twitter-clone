"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../data/models");
class PostService {
    async getAllPosts() {
        const posts = await models_1.Post.findAll({
            include: [
                {
                    model: models_1.Like
                }
            ]
        });
        return posts.map(post => post.toJSON());
    }
    async getPostById(id) {
        const post = await models_1.Post.findByPk(+id, {
            include: [{ model: models_1.Like }],
        });
        return post ? post.toJSON() : null;
    }
    async createPost(post) {
        const postCrated = await models_1.Post.create(post);
        return postCrated.toJSON();
    }
    async updatePost(id, post) {
        const postUpdated = await models_1.Post.findByPk(+id);
        if (!postUpdated)
            return null;
        await postUpdated.update(post);
        return postUpdated.toJSON();
    }
    async deletePost(id) {
        const postDeleted = await models_1.Post.findByPk(+id);
        if (!postDeleted)
            return null;
        await postDeleted.destroy();
        return "Post deleted successfully";
    }
}
exports.default = new PostService();
