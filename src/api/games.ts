import axios from 'axios';

const getGames = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/applist`);
    if (response.status === 200) {
      const applist = response.data.applist.apps;
      console.log('Data from server:', applist);
      return applist;
    } else {
      console.error('응답에러: ', response.status);
    }
  } catch (error) {
    console.error('fetch 에러: ', error);
    throw error;
  }
};

// const gameDetails = async (appid: string) => {
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/appdetail/${appid}`);
//     if (response.status === 200) {
//       console.log('Data from server:', response.data);
//       return response.data;
//     } else {
//       console.error('응답에러: ', response.status);
//     }
//   } catch (error) {
//     console.error('fetch 에러: ', error);
//     throw error;
//   }
// };

export { getGames };
