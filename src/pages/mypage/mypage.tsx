import React, { useEffect, useState } from 'react';
import { supabasedata } from 'shared/supabase';
import { StUserinfoBOx } from './styles';

const MyPage = () => {
  const [userList, setUserList] = useState<User[]>([]);
  interface User {
    email: string;
    avatar_url: string | null;
    username: string | null;
    admin: boolean | null;
    id: string;
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data, error } = await supabasedata.from('userinfo').select();

        if (error) {
          console.error('Error fetching user info:', error.message);
        } else {
          if (data && data.length > 0) {
            setUserList(data);
            console.log(data);

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
  console.log(userList);

  return (
    <div>
      <h2>My Page</h2>

      <p>일단 모든 유저의 회원정보를 불러옴 이제 fillter로 현재 로그인한 회원정보만 표시할예정</p>

      <div>
        {userList.map((user: User, index: number) => (
          <StUserinfoBOx key={index}>
            <p>Email: {user.email}</p>
            <p>Avatar URL: {user.avatar_url}</p>
            <p>Username: {user.username}</p>
            <p>Admin: {user.admin ? 'Yes' : 'No'}</p>
            <p>ID: {user.id}</p>
          </StUserinfoBOx>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
