import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

export class Like extends Model {
  declare id: number;
  declare userId: number;
  declare postId: number;
}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Like',
    tableName: 'likes',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'postId'], // para evitar likes duplicados
      },
    ],
  }
);
