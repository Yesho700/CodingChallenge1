import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';
import PhotoInter from 'src/interfaces/photo.interface';

@Table({ tableName: 'photos', timestamps: true})
export class Photo extends Model<Photo | PhotoInter> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  publicId: string;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
  })
  url: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
  })
  caption: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_id'
  })
  userId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  width: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  height: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  format: string;
}