import axios from 'axios';

const getGames = async () => {
  try {
    // const response = await axios.get(`${process.env.REACT_APP_STEAM_API_URL}`);
    const { data } = await axios.get('/ISteamApps/GetAppList/v2');
    console.log(data);
    return data;
  } catch (error) {
    console.error('fetch 에러: ', error);
  }
};

export { getGames };
