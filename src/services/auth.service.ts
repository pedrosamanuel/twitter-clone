import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../data/models/User';

export class AuthService {
  static async register(username: string, password: string) : Promise<User> {
    try {
      const hashPassowrd = await bcrypt.hash(password, 10);
      const user = await User.create({ username: username, password: hashPassowrd });
      return user
    } catch (error) {
      throw error;
    }
  }

  static async login(username: string, password: string):Promise<{ token: string; user: User }> {
  const user = await User.findOne({ where: { username } });
  if (!user) throw new Error('Usuario no encontrado');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Contraseña incorrecta');

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  );

  return { token, user };
}
}

export default AuthService;