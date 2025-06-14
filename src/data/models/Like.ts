import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { CreationOptional } from 'sequelize';
import { User } from './User';
import { Post } from './Post';

@Table({ tableName: 'likes', timestamps: true })
export class Like extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: CreationOptional<number>;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @ForeignKey(() => Post)
  @Column(DataType.INTEGER)
  postId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Post)
  post!: Post;
}

