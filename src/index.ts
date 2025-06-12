import express from 'express';
import sequelize from './config/database';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import './data/models/index';
import router from './routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('DB connected and synced');
  app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
});

