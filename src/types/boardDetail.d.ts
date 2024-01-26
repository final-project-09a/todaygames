export interface PostDetail {
  id: string;
  title: string;
  game: string;
  category: string;
  content: string;
  image: string;
  created_At: string;
  user_id: string;
}

export interface DetailImages {
  index: number;
  img: string;
}
