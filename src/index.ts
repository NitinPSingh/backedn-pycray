import express from 'express';
import cors from 'cors';
import { sequelize } from './models';
import router from './route'; 

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', router); 

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
