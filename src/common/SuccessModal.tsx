import styled from 'styled-components';
import success from 'assets/icons/success.svg';

interface SuccessModalProps {
  isOpen: boolean;
  children: JSX.Element;
}

const SuccessModal = ({ isOpen, children }: SuccessModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <StModalWrapper>
      <StSuccessIcon />
      {children}
    </StModalWrapper>
  );
};

export default SuccessModal;

const StModalWrapper = styled.div`
  position: fixed;
  top: 130px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.color.white};
  background: ${(props) => props.theme.color.black};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  user-select: none;
  z-index: 10;
`;

const StSuccessIcon = styled.div`
  width: 24px;
  height: 24px;
  background: url(${success}) no-repeat center center;
`;
