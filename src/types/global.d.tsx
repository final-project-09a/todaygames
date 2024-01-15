export type SteamProfile = {
  appid: number;
  playtime_forever: number;
};

export type Post = {
  id: number;
  user_id: number;
  category: string;
  title: string;
  content: string;
  image: string;
  comments_count: number;
  like_count: number;
};
