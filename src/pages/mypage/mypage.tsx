import React, { useEffect, useState } from 'react';
import { supabasedata } from 'shared/supabase';

const MyPage = () => {
  const [useremail, setUseremail] = useState();
  const [Profile, setProfile] = useState();
  const [avatar_url, setavatar_url] = useState();
  const [id, setid] = useState();
  const [username, setusername] = useState();
  const [userList, setuserList] = useState<any>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data, error } = await supabasedata.from('userinfo').select();

        if (error) {
          console.error('Error fetching user info:', error.message);
        } else {
          if (data && data.length > 0) {
            setUseremail(data[5].email);
            setProfile(data[5].Profile);
            setavatar_url(data[5].avatar_url);
            setid(data[5].id);
            setusername(data[5].username);
            // setuserList(data);
            console.log(data);
            console.log(userList);

            console.log(useremail);
            // 여기서 해야할거 map으로 모든 테이블 값을 출력후
            //fillter를 이용 uid의 값이 현재 로그인 정보랑같은 경우에만 출력
          } else {
            console.warn('No user info found.');
          }
        }
      } catch (error) {
        console.error('Error fetching user info:');
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <h2>My Page</h2>
      {useremail ? <p>Email: {useremail}</p> : <p>Loading user information...</p>}
      {Profile ? <p>Profile: {Profile}</p> : <p>Loading user information...</p>}
      {avatar_url ? <p>avatar_url: {avatar_url}</p> : <p>Loading user information...</p>}
      {id ? <p>id: {id}</p> : <p>Loading user information...</p>}
      {username ? <p>username: {username}</p> : <p>Loading user information...</p>}
      {/* {userInfo ? <p>Email: {userInfo1}</p> : <p>Loading user information...</p>} */}
      <p>여기다 맵 사용 예정</p>
      {/* {userList.map((user: any) => user['email'] + '-' + user['id'])} */}
      {/* 
      <ul>
        {userList &&
          userList.map((user: any) => (
            <li key={user.id}>
              <p>{`${user.email} - ${user.id}`}</p>
              <p>Avatar URL: {user.avatar_url}</p>
              <p>Username: {user.username}</p>
              <p>Profile: {user.Profile}</p>
            </li>
          ))}
      </ul> */}

      {/* <ul>
        {userList.map((user) => (
          // Check if the user ID matches the authenticated user's ID
          <li key={user.id}>
            <p>Email: {user.email}</p>
            <p>ID: {user.uuid}</p>
            <p>Avatar URL: {user.avatar_url}</p>
            <p>Username: {user.username}</p>
            <p>Profile: {user.Profile}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default MyPage;
