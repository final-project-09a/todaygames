import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Supabase 연결 정보
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey = process.env.REACT_APP_SUPABASE_APIKEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Steam API 엔드포인트
const steamApiEndpoint = 'https://api.steampowered.com/ISteamApps/GetAppList/v2';

// Steam API로부터 데이터 가져와서 Supabase에 저장하는 함수
async function fetchDataFromSteam() {
  try {
    // Steam API로부터 데이터 가져오기
    const response = await axios.get(steamApiEndpoint);
    const appList = response.data.applist.apps;

    // Supabase에 업데이트
    for (const app of appList) {
      // games 테이블에 데이터가 존재하는지 확인
      const { data, error } = await supabase.from('games').select('appid').eq('appid', app.appid);

      // games 테이블에 데이터가 없으면 새로 추가
      if (error || !data || data.length === 0) {
        await supabase.from('games').upsert([
          {
            app_Id: app.appid,
            name: app.name
          }
        ]);
      }
    }

    console.log('Data successfully updated in Supabase.');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Steam API로부터 데이터를 가져와서 Supabase에 업데이트 실행
fetchDataFromSteam();
