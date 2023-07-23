import { config } from 'dotenv';
import { Sequelize } from 'sequelize';
import { Response, Request } from 'express';

config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as 'postgres',
  },
);

async function connectionForDatabase(req: Request, res: Response) {
  try {
    await sequelize.authenticate();
    res.status(200).json('Conexão feita com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    res.status(500).json('Erro ao conectar ao banco de dados');
  } finally {
    await sequelize.close();
    console.log('Conexão com o banco de dados encerrada.');
  }
}

export default connectionForDatabase;
