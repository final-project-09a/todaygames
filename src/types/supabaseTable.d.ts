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
          image: string;
          created_At: string;
          user_id: string;
        };
        Insert: {
          id: string;
          user_id: string;
          content: string;
          image: string;
          title: string;
          category: string;
          game: string;
          created_At: Date;
        };
        Update: {
          id: string;
          user_id: string;
          content: string;
          image: string;
          title: string;
          category: string;
          game: string;
          created_At: Date;
        };
        Controll: {
          id?: string;
          user_id?: string;
          category: string;
          title?: string;
          image?: string;
          content?: string;
        };
        Delete: {
          id: string;
          user_id: string;
          content: string;
          image: string;
          title: string;
          category: string;
          game: string;
          created_At: Date;
        };
      };
      comments: {
        CommentsUrl: {
          Select: {
            user_id: string;
            comments: string;
            comment_nickname: string;
            id: string;
          };
          Userinfo: {
            avatar_url: string;
            nickname: string;
          };
        };
        Select: {
          user_id: string;
          comment_nickname: string;
          comment_id: string;
          comments: string;
          created_at: string;
          id: string;
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
