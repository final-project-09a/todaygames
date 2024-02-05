export type Game = {
    app_id: number;
    name: string;
    required_age: number;
    is_free: boolean;
    short_description: string;
    capsule_image: string;
    genres: string;
    header_image: string;
    pcRequirements: string | null;
    website: string;
  };
  
  export type BookMark = {
    app_id: number;
  };