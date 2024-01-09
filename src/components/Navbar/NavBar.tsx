import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { supabasedata } from 'shared/supabase';
import { NavContainer, NavLogo, BtnInputWrapper, HeaderButton } from './styles';
import logo from 'assets/img/logo.png';

const NavBar: React.FC = () => {
  // const authState = useSelector((state: RootState) => state.authSlice); // Update RootState with your actual root state type
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabasedata.auth.signOut();

      // Replace swal with regular alert
      alert('로그아웃 되었습니다.');

      navigate('/');
      setCurrentUser(null);
    } catch (error) {
      console.error(error);
      alert('로그아웃 중에 오류가 발생했습니다.');
    }
  };

  return (
    <NavContainer>
      <Link to="/">
        <NavLogo src={logo} />
      </Link>
      <BtnInputWrapper>
        <HeaderButton>
          {currentUser ? (
            <>
              {/* <Link to={`/mypage/:${supabasedata.auth.users()?.id}`}>마이페이지</Link> */}
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
            </>
          )}
        </HeaderButton>
      </BtnInputWrapper>
    </NavContainer>
  );
};

export default NavBar;
