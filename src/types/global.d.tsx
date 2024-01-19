export type SteamProfile = {
  appid: number;
  playtime_forever: number;
};

export type Post = {
  title: string;
  game: string;
  category: string;
  image: string;
  content: string;
  users_id?: string;
};
