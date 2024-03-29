import React from 'react';

//  게시판 타입 저장
export type Json = string | Date | number | boolean | null | { [key: string]: Json } | Json[];
export interface Typedata {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          title: string;
          game: string;
          category: string;
          content: string;
          image: string[];
          created_At: string;
          user_id: string;
          like_count: number;
          comment_count: number;
          star_rating: "" | "⭐" | "⭐⭐" | "⭐⭐⭐" | "⭐⭐⭐⭐" | "⭐⭐⭐⭐⭐" | string[];
          review:string
        };
        Insert: {
          id: string;
          title: string;
          game: string;
          category: string;
          content: string;
          image: string[];
          created_At: string;
          user_id: string;
          star_rating:string,
          review:string
        };
        Update: {
          id: string;
          title: string;
          game: string;
          category: string;
          content: string;
          image: string[];
          created_At: string;
          user_id: string;
          star_rating:string,
          review:string
        };
        Controll: {
          id?: string;
          user_id?: string;
          category: string;
          title?: string;
          image?: string[];
          content?: string;
        };
        Delete: {
          id: string;
          title: string;
          game: string;
          category: string;
          content: string;
          image: string[];
          created_At: string;
          user_id: string;
          star_rating:string,
          review:string
        };
      };
      comments: {
        CommentsUrl: {
          Select: {
            user_id: string;
            comments: string;
            comment_nickname: string;
            id: string;
            avatar_url: string
          };
          Userinfo: {
            avatar_url: string;
            nickname: string;
          };
          Delete: {
            comment_id: string;
            comments: string;
            created_at: string;
            user_id: string;
            comment_nickname: string;
            id: string;
            avatar_url: string;
          }
        };
        Select: {
          user_id: string;
          comment_nickname: string;
          comment_id: string;
          comments: string;
          created_at: string;
          id: string;
          avatar_url: string
        };
        Insert: {
          id: string;
          comment_id: number;
          comments: string;

          created_at: Date;
        };
        Update: {
          id: string;
          comment_id: number;
          comments: string;

          created_at: Date;
        };
        Control: {
          comment: {
            id: string;
            comment_id: number;
            comments: string;
            created_at: Date;
          };
          replies: {
            user_id: string;
            reply_text: string;
            comment_id: string;
            reply_nickname: string;
            reply_avatar_url: string
          };
          delete_replies: {
            user_id: string;
            reply_text: string;
            comment_id: string;
            reply_nickname: string;
            reply_avatar_url: string;
            for_delete: string
          };
        };
      };
      userinfo: {
        Row: {
          nickname: string;
          id: string;
          avatar_url: string;
        };
      };
      games: {
        Row: {
          app_id: number;
          name: string;
          required_age: number;
          is_free: boolean;
          short_description: string;
          header_image: string;
          capsule_image: string;
          website: string;
          genres: string;
          pcRequirements: {
            DirectX: string;
            etc: string;
            graphics: string;
            memory: string;
            network: string;
            os: string;
            processor: string;
            sound: string;
            storage: string;
          };
        };
      };
      replies: {
        user_id: string;
        reply_id: number;
        reply_text: string;
        created_at: string;
        comment_id: string;
      };
    };
  };
}
