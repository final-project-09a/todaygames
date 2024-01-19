// 각 테이블 전체 타입 정한 후
export type Json = string | Date | number | boolean | null | { [key: string]: Json | undefined } | Json[];
export interface Typedata {
  public: {
    Tables: {
      posts: {
        Row: {
          // create,select
          id: string;
          users_id: string;
          like_count: number;
          comments_count: number;
          content: string;
          image: string;
          title: string;
          category: string;
        };
        Insert: {
          id: string;
          users_id?: string;
          category: string;
          title: string;
          image?: string;
          content: string;
          like_count: number;
          comments_count: number;
        };
        Update: {
          getgamesData: any;
          id: string;
          users_id: string;
          category: string;
          title: string;
          image: string;
          content: string;
          like_count: number;
          comments_count: number;
        };
        Controll: {
          id: string;
          users_id: string;
          category: string;
          title: string;
          image: string;
          content: string;
          like_count: number;
          comments_count: number;
        };
      };
      comments: {
        Row: {
          id: string;
          comment_id: number;
          comments: string;
          parent_comment: string;
          created_at: Date;
        };
        Insert: {
          id: string;
          comment_id: number;
          comments: string;
          parent_comment: string;
          created_at: Date;
        };
        Update: {
          id: string;
          comment_id: number;
          comments: string;
          parent_comment: string;
          created_at: Date;
        };
        Controll: {
          id: string;
          comment_id: number;
          comments: string;
          parent_comment: string;
          created_at: Date;
        };
      };
      userinfo: {
        Row: {
          nickname: string;
          id: string;
          username: string;
          avatar_url: string;
        };
      };
      games: {
        Row: {
          add_id: number;
          name: string;
          required_age: number;
          is_free: boolean;
          short_description: string;
          header_image: string;
          capsule_image: string;
          website: string;
          genres: string;
          id: string;
        };
      };
    };
  };
}
