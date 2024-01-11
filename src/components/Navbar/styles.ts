import styled from 'styled-components';

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

const HeaderButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  color: #fff;
  cursor: pointer;

  & button {
    padding: 8px 12px;
    border: 1px solid #fff;
    border-radius: 8px;
  }
`;

// const LoginLink = styled`
//   padding: 8px 12px;
//   border: 1px solid #fff;
//   border-radius: 8px;
// `;

export { NavContainer, NavLogo, BtnInputWrapper, HeaderButton };
