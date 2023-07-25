import { DataTypes } from 'sequelize';
import { User } from './User';
import sequelize from '../../infra/database';
import { uuid } from 'uuidv4';
import ProductModel from '../Product/ProductModel';
import ProfitModel from '../Profit/ProfitModel';

const UserModel = User;

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuid(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
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

User.hasMany(ProductModel, {
  foreignKey: 'userId', // Nome da coluna que será a chave estrangeira na tabela de produtos
});
User.hasMany(ProfitModel, {
  foreignKey: 'userId', // Nome da coluna que será a chave estrangeira na tabela de produtos
});

export default UserModel;
