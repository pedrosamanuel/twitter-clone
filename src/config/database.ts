import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript'; 
import { User } from '../data/models/User';
import { Post } from '../data/models/Post';
import { Like } from '../data/models/Like';

dotenv.config();

let sequelize: Sequelize;

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    models: [User, Post, Like], 
  });
} else {
  sequelize = new Sequelize({
    database: process.env.DB_NAME!,
    username: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    host: process.env.DB_HOST!,
    dialect: 'postgres',
    logging: false,
    models: [User, Post, Like],
  });
}

export default sequelize;

