import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserInfo } from 'api/user';
import { setError, setLoading } from '../../redux/modules/userSlice';
import { setUser } from '../../redux/modules/userSlice';
import { useParams } from 'react-router-dom';
import { RootState } from 'redux/config/configStore';

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
          <p>{user.email}</p>
        </>
      )}
    </div>
  );
};

export default MyPage;
