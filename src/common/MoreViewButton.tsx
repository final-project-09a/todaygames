import React from 'react';
import styled from 'styled-components';

interface MoreViewButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const MoreViewButton = ({ children, onClick }: MoreViewButtonProps) => {
  return (
    <div>
      <StButton onClick={onClick}>
        <h4>{children}</h4>
      </StButton>
    </div>
  );
};

export default MoreViewButton;

const StButton = styled.button`
  padding: 10px 30px;
  border: 1px solid ${(props) => props.theme.color.white};
  border-radius: 10px;
  margin-top: 30px;
  background-color: transparent;
  transition: 0.3s ease;
  & p {
    color: ${(props) => props.theme.color.white};
    font-weight: 500;
  }
  &:hover {
    & h4 {
      color: ${(props) => props.theme.color.gray};
    }
    background-color: ${(props) => props.theme.color.white};
  }
`;
