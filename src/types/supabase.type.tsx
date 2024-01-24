//  게시판 타입 저장
export type Json = string | Date | number | boolean | null | { [key: string]: Json | undefined } | Json[];
export interface Typedata {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          user_id: string;
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
        };
        Update: {
          id: string;
          user_id: string;
          category: string;
          title: string;
          image: string;
          content: string;
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
          title: string;
          image: string;
          content: string;
        };
      };
      comments: {
        CommentsUrl: {
          Select: {
            userid: string;
            comment_id: number;
            comments: string;
            created_at: Date;
          };
          Userinfo: {
            avatar_url: string;
            nickname: string;
          };
        };
        Select: {
          userid: string;
          comment_id: number;
          comments: string;
          created_at: Date;
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
        Controll: [
          comment: {
            id: string;
            comment_id: number;
            comments: string;
            created_at: Date;
          },
          replies: {
            user_id: string;
            reply_id?: number;
            reply_text?: string;
            created_at?: string;
            comment_id: string;
          }
        ];
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
