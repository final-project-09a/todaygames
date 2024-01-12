// 각 테이블 전체 타입 정한 후
export type Json = string | Date | number | boolean | null | { [key: string]: Json | undefined } | Json[];
export interface Typedata {
  public: {
    Tables: {
      posts: {
        Row: {
          // create,select
          id: number;
          user_id: string;
          like_count: number;
          comments_count: number;
          content: string;
          image: string;
          title: string;
          category: string;
        };
        Insert: {
          id: string;
          user_id?: string;
          category: string;
          title: string;
          image?: string;
          content: string;
          like_count: number;
          comments_count: number;
        };
        Update: {
          id: string;
          user_id?: string;
          category: string;
          title: string;
          image?: string;
          content: string;
          like_count: number;
          comments_count: number;
        };
        Controll: {
          id: string;
          user_id: string;
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
          id: number;
          comment_id: number;
          comments: string;
          parent_comment: string;
          create_at: Date;
        };
        Insert: {
          id: number;
          comment_id: number;
          comments: string;
          parent_comment: string;
          create_at: Date;
        };
        Update: {
          id: number;
          comment_id: number;
          comments: string;
          parent_comment: string;
          create_at: Date;
        };
        Controll: {
          id: number;
          comment_id: number;
          comments: string;
          parent_comment: string;
          create_at: Date;
        };
      };
    };
  };
}
