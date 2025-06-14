import express, { Request, Response, NextFunction } from 'express';
import PostService from '../services/post.service';
import { authenticateJWT, AuthRequest } from '../middlewares/auth.middleware';
import authorizePostOwner from '../middlewares/post.owner.middleware';

class PostRoute {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.createRoutes();
  }

  private createRoutes(): void {
    this.router.get('/posts',authenticateJWT, this.getAllPosts.bind(this));
    this.router.get('/posts/:id',authenticateJWT,  this.getPostById.bind(this));
    this.router.post('/posts', authenticateJWT, this.createPost.bind(this));
    this.router.put('/posts/:id', authenticateJWT, authorizePostOwner, this.updatePost.bind(this));
    this.router.delete('/posts/:id', authenticateJWT, authorizePostOwner,  this.deletePost.bind(this));   
  }

  private getAllPosts(req: Request, res: Response, next: NextFunction) {
    PostService.getAllPosts()
      .then((result) => res.json(result))
      .catch((err) => next(err));
  }
  private getPostById(req: Request, res: Response, next: NextFunction) {
    PostService.getPostById(req.params.id)
      .then((result) => res.json(result))
      .catch((err) => next(err));
  }
  private createPost(req: AuthRequest, res: Response, next: NextFunction){
    const userId = req.user!.id;
    PostService.createPost({ ...req.body, userId })
      .then(result => res.status(201).json(result))
      .catch(next);
  }
  private updatePost(req: AuthRequest, res: Response, next: NextFunction) {
    PostService.updatePost(req.params.id, req.body)
      .then((result) => res.json(result))
      .catch((err) => next(err));
  }
  private deletePost(req: AuthRequest, res: Response, next: NextFunction) {
    PostService.deletePost(req.params.id)
      .then((result) => res.json(result))
      .catch((err) => next(err));   
  }
 
}

export default new PostRoute().router;
