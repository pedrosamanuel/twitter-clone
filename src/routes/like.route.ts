// src/routes/like.route.ts
import express, { Request, Response, NextFunction } from 'express';
import LikeService from '../services/like.service';
import { authenticateJWT, AuthRequest } from '../middlewares/auth.middleware';

class LikeRoute {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.createRoutes();
  }

  private createRoutes(): void {
    this.router.post('/likes', authenticateJWT, this.createLike.bind(this));
    this.router.delete('/likes/:id', authenticateJWT,  this.deleteLike.bind(this));
  }

  private async createLike(req: AuthRequest, res: Response, next: NextFunction) {
    const userId = req.user!.id;
    LikeService.createLike({ userId, postId: parseInt(req.body.postId) })
      .then((result) => res.json(result))   
      .catch((err) => next(err));
  }

  private async deleteLike(req: AuthRequest, res: Response, next: NextFunction) {
    LikeService.deleteLike(parseInt(req.params.id))
      .then((result) => res.json(result))
      .catch((err) => next(err));
  }
}

export default new LikeRoute().router;
