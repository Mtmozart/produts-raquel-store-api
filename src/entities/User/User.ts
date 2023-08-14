import { Model } from 'sequelize';

export class User extends Model {
  private readonly id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public slug!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getId(): string {
    return this.id;
  }
}
