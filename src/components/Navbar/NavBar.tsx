import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from 'shared/supabase';
import {
  StNavContainer,
  StNavWrapper,
  StLogoWrapper,
  StMenuWrapper,
  StLogIn,
  StMyPageLink,
  StAccountIcon
} from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import GameSearch from './GameSearch';
import SuccessModal from 'common/SuccessModal';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  // 모달 상태 관리
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const user = useSelector((state: RootState) => state.userSlice.userInfo);

  // 로그인 시 success 모달 오픈
  useEffect(() => {
    if (user) {
      setModalContent('로그인에 성공하였습니다.');
      setModalOpen(true);
    }
  }, [user]);

  // success 모달 3초 뒤 사라지게
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setModalOpen(false);
    }, 3000);

    // Clean up
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isModalOpen, user]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setModalContent('로그아웃 되었습니다.');
      setModalOpen(true);
      navigate('/');
    } catch (error) {
      console.error(error);
      setModalContent('로그아웃에 실패하였습니다.');
      setModalOpen(true);
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
          <GameSearch />
          <StLogIn>
            {user ? (
              <>
                <Link to={'/mypage'}>
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
            {isModalOpen && (
              <SuccessModal isOpen={isModalOpen}>
                <p>{modalContent}</p>
              </SuccessModal>
            )}
          </StLogIn>
        </StMenuWrapper>
      </StNavWrapper>
    </StNavContainer>
  );
};

export default NavBar;
