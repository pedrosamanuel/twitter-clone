import { User } from '../models/User';
import { Post } from '../models/Post';
import { Like } from '../models/Like';

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Like, { foreignKey: 'postId' });
Like.belongsTo(Post, { foreignKey: 'postId' });

User.belongsToMany(Post, { through: Like, foreignKey: 'userId', as: 'LikedPosts' });
Post.belongsToMany(User, { through: Like, foreignKey: 'postId', as: 'Likers' });

export { User } from './User';
export { Post } from './Post';
export { Like } from './Like';

