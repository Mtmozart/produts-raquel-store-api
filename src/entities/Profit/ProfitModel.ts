import { DataTypes } from 'sequelize';
import { Profit } from './Profit';
import { sequelize } from '../../infra/database';
import { uuid } from 'uuidv4';
import UserModel from '../User/UserModel';

const ProfitModel = Profit;

ProfitModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuid(),
      primaryKey: true,
    },
    profit: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true,
    modelName: 'User',
  },
);

export default ProfitModel;
