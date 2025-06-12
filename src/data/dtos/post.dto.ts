import { likeDto } from "./like.dto";

export interface postDto {
    id?: number;
    content: string;
    userId: number;
    likes: likeDto[];
}