import { 
    Table, 
    Column, 
    Model, 
    DataType, 
    PrimaryKey, 
    AutoIncrement,
  } from 'sequelize-typescript';

 
  
  @Table({
    tableName: 'users',
    timestamps: true
  })
  export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
      allowNull: false
    })
    declare id: number;
  
    @Column({
      type: DataType.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    })
    name: string;
  
    @Column({
      type: DataType.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    })
    email: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 100]
      }
    })
    password: string;
  
    @Column({
      type: DataType.ENUM('USER', 'ADMIN'),
      defaultValue: 'USER'
    })
    role: string;
  

    @Column({
      type: DataType.ARRAY(DataType.INTEGER),
      defaultValue: [],
      allowNull: false
    })
    photoIds: number[];
  }