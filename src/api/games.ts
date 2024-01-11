import axios from 'axios';

const getGames = async () => {
  // const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com';
  // const steamApiUrl = 'https://api.steampowered.com/ISteamApps/GetAppList/v2';
  // const PROXY_ID = process.env.REACT_APP_PROXY_ID;

  try {
    const { data } = await axios.get(`/ISteamApps/GetAppList/v2`);
    console.log(data.applist.apps);
    return data.applist.apps;
  } catch (error) {
    console.error('fetch 에러 : ', error);
    throw error;
  }
  //   try {
  //     // const response = await axios.get(`${process.env.REACT_APP_STEAM_API_URL}`);
  //     const { data } = await axios.get('/ISteamApps/GetAppList/v2');
  //     console.log(data);
  //     return data;
  //   } catch (error) {
  //     console.error('fetch 에러: ', error);
  //   }
};

export { getGames };
