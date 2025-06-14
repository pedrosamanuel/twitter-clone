import { Post } from '../data/models/Post';
import { Like } from '../data/models/Like';
import { postDto } from '../data/dtos/post.dto';



class PostService {
  async getAllPosts(): Promise<postDto[]> {
    const posts : Post[] = await Post.findAll({
    include: [
      {
        model: Like
      }
    ]
  });
    return posts.map(post => post.toJSON() as postDto);
  }
  async getPostById(id: string): Promise<postDto | null> {
    const post = await Post.findByPk(+id, {
      include: [{ model: Like }],
    });
    return post ? post.toJSON() as postDto : null;  
  }
  async createPost(post: Partial<postDto>) : Promise<postDto | null>{
      const postCrated =  await Post.create(post);
      return postCrated.toJSON() as postDto
  }
  async updatePost(id: string, post: Partial<postDto>): Promise<postDto | null>{
      const postUpdated = await Post.findByPk(+id);
      if(!postUpdated) return null;
      await postUpdated.update(post);
      return postUpdated.toJSON() as postDto;
  }
  async deletePost(id: string): Promise<string | null>{
      const postDeleted = await Post.findByPk(+id);
      if(!postDeleted) return null;
      await postDeleted.destroy();
      return "Post deleted successfully";
  }
  
}

export default new PostService();
