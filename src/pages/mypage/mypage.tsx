import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserInfo } from 'api/user';
import { setError, setLoading } from '../../redux/modules/userSlice';
import { setUser } from '../../redux/modules/userSlice';
import { useParams } from 'react-router-dom';
import { RootState } from 'redux/config/configStore';
import { StUserinfoBOx, Avatar, Username, UserDetails, UserDetail, UserWrapper } from './styles';
import userimg from 'assets/img/userimg.png';
const MyPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // userSlice의 상태관리를 위해 상태 가져오기
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  console.log(user);

  // 리액트쿼리를 이용해서 supabase에서 user 데이터 가져오기
  const { data } = useQuery({
    queryKey: ['userInfo', id],
    queryFn: UserInfo
  });
  console.log(data);

  // params로 가져온 id값과 일치하는 데이터 찾기
  useEffect(() => {
    try {
      dispatch(setLoading(true));
      const userData = data?.find((userData) => userData.id === id) || null;
      console.log(userData);
      dispatch(setUser(userData));
    } catch (error) {
      dispatch(setError(true));
    }
  }, [dispatch, data, id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user && (
        <>
          <StUserinfoBOx>
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
            <strong>Email:{user.email}</strong>
          </UserDetail>
        </>
      )}
    </div>
  );
};

export default MyPage;
