import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, supabasedata } from 'shared/supabase';
import { NavContainer, NavLogo, BtnInputWrapper, HeaderButton } from './styles';
import logo from 'assets/img/logo.png';

const NavBar: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const navigate = useNavigate();
  const [useruid, setuseruid] = useState<string | null>(null);

  useEffect(() => {
    console.log(supabasedata);
    const authListener = supabasedata.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user?.email || null);

      const userId = session?.user?.id;

      setuseruid(userId || null);
      //로그인한 유저의 uid값을 추출합니다
    });

    return () => {
      authListener;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabasedata.auth.signOut();

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
              {/* 각자의 uid값으로 마이페이에 들어갈수있습니다 */}
              <button>
                <Link to={`/mypage/${useruid}`}>마이페이지</Link>
              </button>
              {/* <Link to={`/mypage/${useruid}`}>마이페이지</Link> */}
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
