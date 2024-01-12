import axios from 'axios';

// const getGames = async () => {
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/applist`);
//     if (response.status === 200) {
//       const applist = response.data.applist.apps;
//       console.log('전체 applist 데이터 :', applist);
//       return applist;
//     } else {
//       console.error('응답에러: ', response.status);
//     }
//   } catch (error) {
//     console.error('fetch 에러: ', error);
//     throw error;
//   }
// };

const getMostPlayedGames = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/most-played-games`);
    const applist = response.data.response.ranks;
    console.log('most played games 데이터 :', applist);
    return applist;
  } catch (error) {
    console.error('fetch 에러: ', error);
    throw error;
  }
};

const getGameDetails = async (appid: any) => {
  try {
    console.log(appid);
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/appdetail/${appid}`);
    if (response.data && response.data.length > 0) {
      console.log('detail 정보: ', response.data);
      return response.data[0].data;
    } else {
      console.error('유효하지 않은 response:', response.data[appid].data);
      throw new Error('유효하지 않은 response');
    }
  } catch (error) {
    console.error('fetch 에러: ', error);
    throw error;
  }
};

export { getMostPlayedGames, getGameDetails };
