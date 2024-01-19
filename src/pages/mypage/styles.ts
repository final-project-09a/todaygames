import styled from 'styled-components';
import cancelIcon from 'assets/icons/cancelIcon.svg';

export const StMypageContainer = styled.form`
  margin-top: 50px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const StUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

export const StUserinfoBox = styled.div`
  position: relative;
  width: 1100px;
  border-radius: 10px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.gray};
  margin-bottom: 30px;
  & h2 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
    user-select: none;
  }
  & label {
    font-size: 14px;
    font-weight: 400;
    margin-top: 30px;
    margin-bottom: 10px;
    user-select: none;
  }
  & input {
    position: relative;
    width: 100%;
    padding: 18px;
    border-radius: 10px;
    height: 48px;
    background: ${(props) => props.theme.color.inputcolor};
    color: ${(props) => props.theme.color.white};
    border: none;
    &:focus {
      outline: none;
    }
  }
  & textarea {
    width: 100%;
    height: 144px;
    border-radius: 10px;
    background: ${(props) => props.theme.color.inputcolor};
    color: ${(props) => props.theme.color.white};
    border: none;
    padding: 18px;
    resize: none;
    line-height: 1.5;
  }
  & p {
    color: #999;
    text-align: right;
    font-size: 14px;
    font-weight: 400;
    line-height: 15px;
    margin-top: 15px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  & select {
    width: 355px;
    padding: 18px;
    border-radius: 10px;
    height: 53px;
    background: ${(props) => props.theme.color.inputcolor};
    color: ${(props) => props.theme.color.white};
    border: none;
  }
`;

export const StErrorMessage = styled.div`
  color: red;
  font-size: 13px;
  padding: 10px;
`;

export const StNickNameCount = styled.div`
  color: #999;
  text-align: right;
  font-size: 14px;
  font-weight: 400;
  line-height: 15px;
  margin-top: 15px;
  position: absolute;
  bottom: 62%;
  right: 5%;
`;

export const StProfileCount = styled.div`
  color: #999;
  text-align: right;
  font-size: 14px;
  font-weight: 400;
  line-height: 15px;
  margin-top: 15px;
  position: absolute;
  bottom: 13%;
  right: 5%;
`;

export const StButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const StTagWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 8px;
`;

export const StCancelIcon = styled.img`
  width: 18px;
  height: 18px;
  color: #999999;
  margin-left: 7px;
`;
