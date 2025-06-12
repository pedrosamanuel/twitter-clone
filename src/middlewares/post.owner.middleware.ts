import { Request, Response, NextFunction } from 'express';
import PostService from '../services/post.service';

interface AuthRequest extends Request {
  user?: { id: string };
}

const authorizePostOwner = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.id;
    const postId = req.params.id;

    const post = await PostService.getPostById(postId);
    if (!post) res.status(404).json({ message: 'Post no encontrado' });

    if (post?.userId !== parseInt(userId)) {
       res.status(403).json({ message: 'No autorizado para modificar este post' });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default authorizePostOwner;
