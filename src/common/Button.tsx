import styled from 'styled-components';

interface ButtonProps {
  children: string;
  onClick?: () => void;
  size: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = ({ disabled, type, children, onClick, size = 'medium' }: ButtonProps) => {
  return (
    <StButton size={size} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </StButton>
  );
};

export default Button;

const getSizeStyles = (size: string) => {
  switch (size) {
    case 'small':
      return `
        width: 100px;
        height: 50px;
      `;
    case 'medium':
      return `
        width: 120px;
        height: 50px;
      `;
    case 'large':
      return `
        width: 224px;
        height: 50px;
      `;
    default:
      return '';
  }
};

const StButton = styled.button<{ size: string }>`
  border-radius: 10px;
  background: ${(props) => props.theme.color.primary};
  backdrop-filter: blur(7.5px);
  color: ${(props) => props.theme.color.white};
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  ${(props) => getSizeStyles(props.size || 'medium')}
  &:hover {
    background: ${(props) => props.theme.color.white};
    color: ${(props) => props.theme.color.gray};
    transition: background 0.3s ease;
    cursor: pointer;
  }
  &:disabled {
    background: ${(props) => props.theme.color.gray};
    color: ${(props) => props.theme.color.lightgray};
    cursor: not-allowed;
  }
`;
