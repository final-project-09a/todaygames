import styled from 'styled-components';
import accountIcon from '../../assets/icons/accountIcon.svg';
import { PiUserCircleLight } from 'react-icons/pi';

const StNavContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StNavWrapper = styled.div`
  width: 1440px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StLogoWrapper = styled.div`
  height: 100%;
`;

const StLogo = styled.img`
  cursor: pointer;
`;

const StMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const StMenu = styled.h2<{ $isSelected: boolean }>`
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => (props.$isSelected ? 'white' : 'gray')};
`;

const StLogMenu = styled.h2<{ $isSelected: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => (props.$isSelected ? '#2D4FA6' : '#2D4FA6')};
`;
const StLogIn = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  cursor: pointer;
  & h3 {
    font-weight: 800;
    color: ${(props) => props.theme.color.primary};
  }
`;

const StMyPageLink = styled.div`
  position: relative;
`;

const StAccountIcon = styled(PiUserCircleLight)<{ $isSelected: boolean }>`
  font-size: 15px;
  position: absolute;
  top: 50%;
  left: -50%;
  width: 32px;
  height: 32px;
  transform: translateY(-50%);
  color: ${(props) => (props.$isSelected ? 'white' : 'gray')};

  /* background: url(${accountIcon}) no-repeat center center;
  background-size: contain; */
  cursor: pointer;
`;

export {
  StMenu,
  StLogMenu,
  StMyPageLink,
  StAccountIcon,
  StNavContainer,
  StLogo,
  StMenuWrapper,
  StLogIn,
  StNavWrapper,
  StLogoWrapper
};
