import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from 'types/supabase';
import {
  StMenu,
  StNavContainer,
  StNavWrapper,
  StLogoWrapper,
  StMenuWrapper,
  StLogIn,
  StMyPageLink,
  StAccountIcon,
  StLogMenu
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
  const location = useLocation();

  useEffect(() => {
    const isHomePage = location.pathname === '/';
    if (isHomePage) {
      setSelectedMenu('홈');
    } else if (location.pathname === '/board') {
      setSelectedMenu('커뮤니티');
    } else if (location.pathname === '/mypage') {
      setSelectedMenu('마이페이지');
    }
  }, [location]);

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
      setSelectedMenu('로그아웃');
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
                <StLogMenu onClick={handleLogout} $isSelected={selectedMenu === '로그아웃'}>
                  로그아웃
                </StLogMenu>
              </>
            ) : (
              <Link to="/login" onClick={() => setSelectedMenu('로그인')}>
                <StLogMenu $isSelected={selectedMenu === '로그아웃'}>로그인</StLogMenu>
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
