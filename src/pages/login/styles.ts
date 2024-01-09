import styled from 'styled-components';

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #181924;
  height: 100vh;
  justify-content: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 350px;
  height: 50px;
  flex-shrink: 0;
  margin-top: 10px;
  border-radius: 15px;
`;

const StyledButton = styled.button`
  width: 350px;
  height: 50px;
  flex-shrink: 0;
  background-color: #2d4fa6;
  color: #ffffff;
  border: none;
  margin-top: 10px;
  border-radius: 15px;

  &:hover {
    background-color: #1c3669;
  }
`;

const StyledH1 = styled.h1`
  color: #ffffff;
  font-family: Pretendard;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StyledLabel = styled.label`
  color: #ffffff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  margin-top: 10px;
  text-align: left;
`;

export { StyledLogin, StyledForm, StyledInput, StyledButton, StyledH1, StyledLabel };
