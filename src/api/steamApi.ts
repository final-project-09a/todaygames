import axios from 'axios';
import { access } from 'fs';
import { SteamProfile } from 'types/global.d';
const STEAM_API_KEY = process.env.REACT_APP_STEAM_API_KEY;
const BASE_URL = 'https://api.steampowered.com';

export const getSteamUserProfile = async (appId: string): Promise<SteamProfile> => {
  const url = `https://perpetual-comet-tip.glitch.me`;
  const resp = await axios.get(`${url}/api/gameInfo/${appId}`);
  const data = resp.data;
  return data;
  // try {
  //   const response = await axios.get(`${BASE_URL}/ISteamUser/GetPlayerSummaries/v0002/`, {
  //     params: {
  //       key: STEAM_API_KEY,
  //       steamids: '76561198122908202'
  //     }
  //   });

  //   return response.data.response.players[0];
  // } catch (error) {
  //   console.error('Error fetching Steam user profile:', error);
  //   throw error;
  // }
};
