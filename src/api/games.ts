import axios from 'axios';

const getMostPlayedGames = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/most-played-games`);
    const mostPlayedGamesData = response.data.response.ranks;
    console.log('most played games 데이터 :', mostPlayedGamesData);
    return mostPlayedGamesData;
  } catch (error) {
    console.error('fetch 에러: ', error);
    throw error;
  }
};

const getGameDetails = async (appid: any) => {
  try {
    console.log(appid);
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/game-details/${appid}`);
    const gameDetails = response.data[appid]?.data;

    if (gameDetails) {
      console.log('game details: ', gameDetails);
      return gameDetails;
    } else {
      console.error('Invalide game deatil', appid);
      throw new Error('Invalid response');
    }
  } catch (error) {
    console.error('fetch error: ', error);
    throw error;
  }
};

// const getTopTenGameDetails = async () => {
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/top-ten`);
//     console.log('most played games 데이터 :', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('top ten fetch error: ', error);
//     throw error;
//   }
// };

export { getMostPlayedGames, getGameDetails };
