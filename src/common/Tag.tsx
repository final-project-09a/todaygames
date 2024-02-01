import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface TagProps {
  children: ReactNode;
  size: string;
  prefix?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

const Tag = ({ onClick, children, size, prefix, backgroundColor = 'secondary' }: TagProps) => {
  return (
    <StTag hasOnClick={!!onClick} onClick={onClick} size={size} $backgroundColor={backgroundColor || ''}>
      {prefix && <span>{prefix}</span>}
      {children}
    </StTag>
  );
};

export default Tag;

const getSizeStyles = (size: string) => {
  switch (size) {
    case 'small':
      return `
        padding: 9px 16px;
        font-size: 14px;
        font-weight: 400;
        `;
    case 'medium':
      return `
        padding: 10px 15px;
        font-size: 15px;
        font-weight: 500;
        `;
    case 'large':
      return `
        padding: 11px 29px;
        font-size: 16px;
        font-weight: 500;
        `;
    default:
      return '';
  }
};

const StTag = styled.div<{ size: string; $backgroundColor: string; hasOnClick: boolean }>`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  user-select: none;
  cursor: ${(props) => (props.hasOnClick ? 'pointer' : 'default')};
  &:hover {
    ${(props) =>
      props.hasOnClick
        ? css`
            background-color: ${(props) => props.theme.color.primary};
          `
        : 'default'};
  }
  ${(props) => getSizeStyles(props.size || 'medium')}
  background: ${(props) => props.theme.color[props.$backgroundColor] || props.theme.color.secondary};
  & p {
    color: ${(props) => props.theme.color.white};
  }
`;
