import styled from 'styled-components';

const StyledSignup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #181924; /* Set the background color */
  height: 100vh; /* Adjust the height as needed */
  justify-content: center;
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const StyledLabel = styled.label`
  color: #ffffff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  margin-top: 10px;
  text-align: left; /* Align text to the left */
`;

const StyledInput = styled.input`
  width: 350px;
  height: 50px;
  flex-shrink: 0;
  margin-top: 5px;
  padding: 10px;
  box-sizing: border-box;
  border: none; /* Remove the border */
  outline: none; /* Remove the outline */
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

export { StyledSignup, StyledForm, StyledInput, StyledButton, StyledH1, StyledLabel };
