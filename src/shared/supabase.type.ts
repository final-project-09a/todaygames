// 각 테이블 전체 타입 정한 후
export type Json = string | Date | number | boolean | null | { [key: string]: Json | undefined } | Json[];
export interface postsTypedata {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number;
          user_id: number;
          category: string;
          title: string;
          image: string;
          content: string;
          like_count: number;
          comments_count: number;
        };
      };
      comments: {
        id: number;
        content: string;
        parent_id: number;
        parent_content: string;
        created_at: Date;
      };
    };
  };
}
