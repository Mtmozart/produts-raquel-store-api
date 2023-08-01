import { Model } from 'sequelize';

export class Profit extends Model {
  private readonly id: string;
  public profit!: number;
  public slug!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
