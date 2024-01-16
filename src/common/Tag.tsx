import { ReactNode } from 'react';
import styled from 'styled-components';

interface TagProps {
  children: ReactNode;
  size: any;
  prefix?: string;
  backgroundColor?: string;
}

const Tag = ({ children, size, prefix, backgroundColor = 'secondary' }: TagProps) => {
  return (
    <StTag size={size} $backgroundColor={backgroundColor || ''}>
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
        padding: 10px 25px;
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

const StTag = styled.div<{ size: any; $backgroundColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  ${(props) => getSizeStyles(props.size || 'medium')}
  background: ${(props) => props.theme.color[props.$backgroundColor] || props.theme.color.secondary};
  & p {
    color: ${(props) => props.theme.color.white};
  }
`;
