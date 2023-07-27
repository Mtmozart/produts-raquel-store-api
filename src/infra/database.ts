require('dotenv').config();
import { Sequelize } from 'sequelize';

const name = process.env.DB_NAME;
const user = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;

const sequelize = new Sequelize(name, user, password, {
  host: host,
  dialect: dialect as 'postgres',
});

try {
  sequelize.authenticate();
  console.log(`Conectamos com sucesso no banco de dados`);
} catch (err) {
  console.log(err);
}

export { sequelize };
