export interface GenreType {
  description: string;
}

export interface GameType {
  appid: number;
  name: string;
  background_raw: string;
  screenshots?: { path_thumbnail: string }[];
  genres: GenreType[];
  short_description: string;
  about_the_game: string;
  developers?: string[] | undefined;
  publishers: string;
  release_date: { date: string };
  detailed_description: string;
  pc_requirements: { minimum: string };
  header_image: string;
  steam_appid: number;
  short_description: string;
  website: string;
  release_date: {
    date: string;
  };
}

export interface GenreNameType {
  index: number;
  tag: string;
  englishTag: string;
  imageUrl: string;
}

interface GameDetailType {
  name: string;
  background_raw: string;
  screenshots?: { path_thumbnail: string }[];
  genres: { description: string }[];
}
