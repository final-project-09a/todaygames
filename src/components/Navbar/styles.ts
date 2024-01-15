import styled from 'styled-components';
import { theme } from 'styles/theme';

const NavContainer = styled.div`
  width: 100%;

  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #181924;
`;

const NavLogo = styled.img`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 80px;
  cursor: pointer;
`;

const BtnInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const HeaderButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  color: ${(props) => props.theme.color.white};
  background-color: #181924;
  cursor: pointer;

  & button {
    color: ${(props) => props.theme.color.white};
    padding: 8px 12px;
    border: 1px solid #181924;
    border-radius: 8px;
    background-color: ${(props) => props.theme.color.primary};
  }
`;

export { NavContainer, NavLogo, BtnInputWrapper, HeaderButton };
