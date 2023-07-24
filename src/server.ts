import { app } from './app';
const conn = require('../src/infra/database');

conn
  .sync()
  .then(() => {
    app.listen(3333);
  })
  .catch((err) => console.log(err));
