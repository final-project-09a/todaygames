import React, { useEffect, useState } from 'react';

import { supabasedata } from 'shared/supabase';
import { StUserinfoBOx, Avatar, Username, UserDetails, UserDetail, UserWrapper } from './styles';
import userimg from 'assets/img/userimg.png';

interface User {
  email: string;
  avatar_url: any;
  username: string | null;
  admin: boolean | null;
  id: string;
  Profile: string | null;
}
const MyPage = () => {
  const [userList, setUserList] = useState<User[]>([]);

  const [useruid, setuseruid] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<string | null>(null);

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

    const authListener = supabasedata.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user?.email || null);

      const userId = session?.user?.id;

      setuseruid(userId || null);
      //로그인한 유저의 uid값을 추출합니다
    });

    fetchUserInfo();
  }, []);
  // console.log(useruid);
  // console.log(userList);

  return (
    <div>
      <div>
        {userList
          .filter((user) => user.id === useruid)
          .map((user: User, index: number) => (
            <>
              <StUserinfoBOx key={index}>
                {/* <Avatar src={user.avatar_url} alt="User Avatar" /> */}
                {/* 아바타 부분은 예시를 위해 assets 폴더에 기본이미지 추가하였습니다 */}
                {/* userinfo테이블에 url을 담는 형식이나 dkslaus수파베이스 스토리지도 사용해야할듯싶네요 */}
                <Avatar src={userimg} alt="User Avatar" />

                <UserWrapper>
                  <Username>{user.username}</Username>
                  {user.Profile}
                </UserWrapper>
              </StUserinfoBOx>
              <UserDetail>
                <strong>Email:</strong> {user.email}
              </UserDetail>
            </>
          ))}
      </div>
    </div>
  );
};

export default MyPage;
