import styled from 'styled-components';

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  & p {
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    margin-top: 40px;
  }
`;

const StFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  font-family: 'Pretendard-Regular';
`;

const StSignInfo = styled.div`
  display: flex;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;

const StyledInput = styled.input`
  font-family: 'Pretendard-Regular';
  width: 350px;
  height: 48px;
  flex-shrink: 0;
  margin-top: 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.color.white};
  background: ${(props) => props.theme.color.postback};
  border: none;
  padding-left: 18px;
`;

const StyledButton = styled.button`
  font-family: 'Pretendard-Regular';
  width: 350px;
  height: 50px;
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.white};
  border: none;
  margin-top: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    color: ${(props) => props.theme.color.black};
    background-color: ${(props) => props.theme.color.white};
  }
`;
const StkakaoButton = styled.button`
  font-family: 'Pretendard-Regular';
  width: 170px;
  height: 50px;
  background-color: #f7e600;
  color: ${(props) => props.theme.color.black};
  border: none;
  margin-top: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    color: ${(props) => props.theme.color.black};
    background-color: #ccbe04;
  }
`;

const StOtherLoginWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledH1 = styled.h1`
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 50px;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
`;

export {
  StOtherLoginWrapper,
  StFormWrapper,
  StyledLogin,
  StyledInput,
  StyledButton,
  StyledH1,
  StyledLabel,
  StkakaoButton,
  StSignInfo
};
