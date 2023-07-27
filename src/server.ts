import { app } from './app';
import { sequelize } from '../src/infra/database';

sequelize
  .sync()
  .then(() => {
    app.listen(3333);
  })
  .catch((err) => console.log(err));
