import React from 'react';

type LikeProps = {
  userId: string;
  appId: number;
};

type Headers = {
  'Content-Type': string;
  apikey?: string;
};

const Like: React.FC<LikeProps> = () => {
  //   const [liked, setLiked] = useState(false);

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = process.env.REACT_APP_SUPABASE_APIKEY;

  const headers: Headers = {
    'Content-Type': 'application/json'
  };

  const toggleLike = async (userId: string, appId: number) => {
    // apikey가 정의되어 있다면 헤더에 추가
    if (supabaseKey) {
      headers.apikey = supabaseKey;
    }

    const response = await fetch(`${supabaseUrl}/rest/user_likes?select=*,games(*)`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        user_id: userId,
        app_id: appId
      })
    });
  };

  // 북마크 토글
  const toggleBookmark = async (userId: string, appId: number) => {
    if (supabaseKey) {
      headers.apikey = supabaseKey;
    }
    const response = await fetch(`${supabaseUrl}/rest/user_bookmarks?select=*,games(*)`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        user_id: userId,
        app_id: appId
      })
    });

    const data = await response.json();
    console.log('Bookmark Toggled:', data);
  };
  console.log(toggleBookmark);

  return <div>Like</div>;
};

export default Like;
