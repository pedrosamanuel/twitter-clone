import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { CreationOptional } from 'sequelize';
import { Post } from './Post';
import { Like } from './Like';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: CreationOptional<number>;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @HasMany(() => Post)
  posts!: Post[];

  @HasMany(() => Like)
  likes!: Like[];
}