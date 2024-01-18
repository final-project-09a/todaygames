import styled from 'styled-components';
import accountIcon from '../../assets/icons/accountIcon.svg';

const StNavContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
`;

const StNavWrapper = styled.div`
  width: 1440px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StLogoWrapper = styled.div`
  font-size: 30px;
`;

const StLogo = styled.img`
  cursor: pointer;
`;

const StMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  & h2 {
    font-size: 16px;
    font-weight: 400;
  }
`;

const StLogIn = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  cursor: pointer;
`;

const StMyPageLink = styled.div`
  position: relative;
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

export { StMyPageLink, StAccountIcon, StNavContainer, StLogo, StMenuWrapper, StLogIn, StNavWrapper, StLogoWrapper };
