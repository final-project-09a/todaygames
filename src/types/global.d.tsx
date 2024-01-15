export type SteamProfile = {
  appid: number;
  playtime_forever: number;
};

export type Post = {
  id?: number;
  category?: string;
  title?: string;
  image?: string;
  content?: string;
  comments_count?: number;
  like_count?: number;
  users_id?: string;
};
