export type SteamProfile = {
  appid: number;
  playtime_forever: number;
};

export type Post = {
  user_id: string;
  title: string;
  game: string;
  category: string;
  image: string[];
  content: string;
};

export type FormData = {
  email: string;
  password: string;
  displayName: string;
};
