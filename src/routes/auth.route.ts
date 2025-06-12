import express, { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

class AuthRoute {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.createRoutes();
  }

  private createRoutes(): void {
    this.router.post('/register', this.register.bind(this));
    this.router.post('/login', this.login.bind(this));
    this.router.post('/logout', this.logout.bind(this));
  }

  private async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const user = await AuthService.register(username, password);
      res.status(201).json({ id: user.id, username: user.username });
    } catch (err) {
      next(err);
    }
  }

  private async login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    const { token, user } = await AuthService.login(username, password);

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
  } catch (err) {
    next(err);
  }
}
private async logout(_req: Request, res: Response, _next: NextFunction) {
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

export default new AuthRoute().router;
