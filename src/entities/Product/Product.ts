import { Model } from 'sequelize';

export class Product extends Model {
  private readonly id: string;
  public name!: string;
  public entrance!: number;
  public sold!: number;
  public stock!: number;
  public price!: number;
  public stockValue!: number;
  public percentage!: number;
  public slug!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
