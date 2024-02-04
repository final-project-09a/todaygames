
export interface DetailImages {
  index: number;
  img: string;
}

export interface ReviewPostType {
  id:stirng;
  user_id:string;
  star_rating:"" | "⭐" | "⭐⭐" | "⭐⭐⭐" | "⭐⭐⭐⭐" | "⭐⭐⭐⭐⭐" | string[];
  review:string
}

export interface ReviewUserType {
  id:string;
  nickname:string;
  avatar_url:string;
}