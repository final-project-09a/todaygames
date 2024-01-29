import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from 'types/supabase';
import {
  StMenu,
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
import logo3 from 'assets/logo/logo3.png';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/modules/userSlice';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 모달 상태 관리
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [searchedText, setSearchedText] = useState<string>('');
  const [showLoginSuccessModal, setShowLoginSuccessModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('홈');

  const user = useSelector((state: RootState) => state.userSlice.userInfo);

  useEffect(() => {
    const isHomePage = window.location.pathname === '/';
    if (isHomePage) {
      setSearchedText('');
    }
  }, [navigate]);

  // 로그인 시 success 모달 오픈
  useEffect(() => {
    if (user && showLoginSuccessModal) {
      setModalContent('로그인에 성공하였습니다.');
      setModalOpen(true);
      setShowLoginSuccessModal(false);
    }
  }, [user, showLoginSuccessModal]);

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
      dispatch(setUser(null));
      setShowLoginSuccessModal(true);
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
          <img src={logo3} alt="로고" />
        </StLogoWrapper>
        <StMenuWrapper>
          <Link to="/" onClick={() => setSelectedMenu('홈')}>
            <StMenu $isSelected={selectedMenu === '홈'}>홈</StMenu>
          </Link>
          <Link to="/board" onClick={() => setSelectedMenu('커뮤니티')}>
            <StMenu $isSelected={selectedMenu === '커뮤니티'}>커뮤니티</StMenu>
          </Link>
          <GameSearch searchedText={searchedText} setSearchedText={setSearchedText} />
          <StLogIn>
            {user ? (
              <>
                <Link to="/mypage" onClick={() => setSelectedMenu('마이페이지')}>
                  <StMyPageLink>
                    <StAccountIcon $isSelected={selectedMenu === '마이페이지'} />
                    <StMenu $isSelected={selectedMenu === '마이페이지'}>마이페이지</StMenu>
                  </StMyPageLink>
                </Link>
                <h3 onClick={handleLogout}>로그아웃</h3>
              </>
            ) : (
              <Link to="/login">
                <h3>로그인</h3>
              </Link>
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
