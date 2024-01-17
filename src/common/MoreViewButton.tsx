import React from 'react';
import styled from 'styled-components';

interface MoreViewButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const MoreViewButton = ({ children, onClick }: MoreViewButtonProps) => {
  return (
    <StButton onClick={onClick}>
      <p>{children}</p>
    </StButton>
  );
};

export default MoreViewButton;

const StButton = styled.button`
  width: 100%;
  height: 50px;
  border: 1px solid ${(props) => props.theme.color.white};
  border-radius: 10px;
  margin-top: 30px;
  background-color: transparent;
  & p {
    color: ${(props) => props.theme.color.white};
    font-weight: 500;
  }
`;
