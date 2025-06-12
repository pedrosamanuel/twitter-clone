// src/services/like.service.ts
import { Like } from '../data/models/Like';

export default class LikeService {
  static async createLike(data: { userId: number; postId: number }) {
  const existingLike = await Like.findOne({
    where: {
      userId: data.userId,
      postId: data.postId,
    },
  });

  if (existingLike) {
    throw new Error('El usuario ya le dio like a este post');
  }

  return await Like.create(data);
}


  static async deleteLike(id: number) {
    const like = await Like.findByPk(id);
    if (!like) throw new Error('Like no encontrado');
    await like.destroy();
    return { message: 'Like eliminado correctamente' };
  }
}
