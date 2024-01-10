import axios from 'axios';

const STEAM_API_KEY = process.env.REACT_APP_STEAM_API_KEY;
const BASE_URL = 'https://api.steampowered.com';

export const getSteamUserProfile = async (steamId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/ISteamUser/GetPlayerSummaries/v0002/`, {
      params: {
        key: STEAM_API_KEY,
        steamids: '76561198122908202'
      }
    });

    return response.data.response.players[0];
  } catch (error) {
    console.error('Error fetching Steam user profile:', error);
    throw error;
  }
};
