import styled from 'styled-components';

const StyledSignup = styled.div`
  width: 490px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px auto;
  & p {
    color: #ccc;
    font-size: 14px;
    font-weight: 400;
    margin-top: 10px;
  }
`;

const StyledH1 = styled.h1`
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 50px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StInputBtwrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  /* justify-content: space-between;
  align-items: center; */
`;

const StInputGroup = styled.div`
  width: 491px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 490px;
  height: 48px;
  margin-top: 5px;
  padding-left: 18px;
  border: none; /* Remove the border */
  outline: none; /* Remove the outline */
  border-radius: 10px;
  background: #232323;
  color: ${(props) => props.theme.color.white};
`;

const StyledInputShort = styled(StyledInput)`
  width: 350px;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 6px;
`;

const StyledButton = styled.button`
  width: 490px;
  height: 50px;
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.white};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    color: ${(props) => props.theme.color.black};
    background-color: ${(props) => props.theme.color.white};
  }
`;

const StyledButtonShort = styled(StyledButton)`
  width: 131px;
  height: 48px;
  background-color: ${(props) => props.theme.color.white};
  color: ${(props) => props.theme.color.black};
  &:hover {
    color: ${(props) => props.theme.color.white};
    background-color: ${(props) => props.theme.color.primary};
  }
`;
const successMessages = ['사용 가능한 닉네임입니다.', '사용 가능한 이메일입니다.', '사용가능한 비밀번호입니다.'];

const StErrorMessage = styled.div`
  font-size: 13px;
  padding: 10px;
  color: ${(props) => (successMessages.includes(String(props.children)) ? 'green' : 'red')};
`;
export {
  StyledButtonShort,
  StyledInputShort,
  StInputGroup,
  StyledSignup,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledH1,
  StyledLabel,
  StInputBtwrap,
  StErrorMessage
};
