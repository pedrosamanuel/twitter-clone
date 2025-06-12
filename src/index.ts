import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import sequelize from './config/database';
import cookieParser from 'cookie-parser';
import './data/models/index';
import router from './routes';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

const PORT = process.env.PORT || 3000;


sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database connected and synced');
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === 'production') {
        console.log(`🚀 Server running on port ${PORT}`);
      } else {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      }
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to DB:', err);
    process.exit(1); 
  });
