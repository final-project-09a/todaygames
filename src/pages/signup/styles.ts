import styled from 'styled-components';

const StyledSignup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.color.balck};
  height: 100vh;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const StyledLabel = styled.label`
  color: ${(props) => props.theme.color.white};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-top: 10px;
  line-height: normal;
  text-align: left;
  display: flex;
`;

const StyledInput = styled.input`
  width: 491px;
  height: 48px;
  flex-shrink: 0;
  margin-top: 5px;
  padding: 10px;
  box-sizing: border-box;
  border: none; /* Remove the border */
  outline: none; /* Remove the outline */
  border-radius: 10px;
  background: #232323;
  color: ${(props) => props.theme.color.white};
`;

const StyledButton = styled.button`
  width: 491px;
  height: 50px;
  flex-shrink: 0;
  background-color: ${(props) => props.theme.color.white};
  color: ${(props) => props.theme.color.balck};
  border: none;
  margin-top: 40px;
  border-radius: 10px;

  &:hover {
    background-color: #1c3669;
  }
`;

const StyledH1 = styled.h1`
  color: ${(props) => props.theme.color.white};
  font-family: Pretendard;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
export { StInputGroup, StyledSignup, StyledForm, StyledInput, StyledButton, StyledH1, StyledLabel };
