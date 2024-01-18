import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from 'shared/supabase';
import { StNavContainer, StNavWrapper, StLogoWrapper, StMenuWrapper, StLogIn } from './styles';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/modules/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import Search from './Search';
import styled from 'styled-components';
import accountIcon from '../../assets/icons/accountIcon.svg';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.userSlice.userInfo);

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        dispatch(setUser({ email: session.user.email }));
        const userId = session.user.id;
        dispatch(setUser({ id: userId }));
      }
    });

    // clean up
    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      alert('로그아웃 되었습니다.');
      navigate('/');
      dispatch(setUser(null));
    } catch (error) {
      console.error(error);
      alert('로그아웃 중에 오류가 발생했습니다.');
    }
  };

  return (
    <StNavContainer>
      <StNavWrapper>
        <StLogoWrapper>
          <Link to="/">Logo</Link>
        </StLogoWrapper>

        <StMenuWrapper>
          <Link to={'/'}>
            <h2>홈</h2>
          </Link>
          <Link to={'/board'}>
            <h2>커뮤니티</h2>
          </Link>
          <Search />
          <StLogIn>
            {user ? (
              <>
                <Link to={`/mypage/${user.id}`}>
                  <StMyPageLink>
                    <StAccountIcon />
                    <h2>마이페이지</h2>
                  </StMyPageLink>
                </Link>

                <h2 onClick={handleLogout}>로그아웃</h2>
              </>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </StLogIn>
        </StMenuWrapper>
      </StNavWrapper>
    </StNavContainer>
  );
};

export default NavBar;

const StMyPageLink = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
`;

const StAccountIcon = styled.div`
  position: absolute;
  top: 50%;
  left: -50%;
  width: 32px;
  height: 32px;
  transform: translateY(-50%);
  background: url(${accountIcon}) no-repeat center center;
  background-size: contain;
  cursor: pointer;
`;
