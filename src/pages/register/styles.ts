import styled from 'styled-components';

const MainBackground = styled.div`
  width: 100%;
  display: flex;
  background: ${(props) => props.theme.color.black};
  justify-content: center;
`;

const WrappingBtnAndInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
`;

const WrappingTitleAndBtn = styled.div`
  width: 1240px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 60px;
`;

const TitleText = styled.div`
  display: flex;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`;

const WrappingBtns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const CancelBtn = styled.button`
  width: 80px;
  height: 48px;
  border-radius: 10px;
  background: ${(props) => props.theme.color.white};
  border: 0px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
`;

const RegisterBtn = styled.button`
  width: 80px;
  height: 48px;
  border-radius: 10px;
  background: ${(props) => props.theme.color.primary};
  border: 0px;
  color: white;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
`;

const WrappingInput = styled.form`
  margin-top: 20px;
  width: fit-content;
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: #232323;
  align-items: center;
  border-radius: 10px;
  padding: 5px 0px 30px 0px;
`;

const TitleInput = styled.textarea`
  display: flex;
  width: 1223px;
  height: 50px;
  border-radius: 10px;
  background: ${(props) => props.theme.color.inputcolor};
  color: white;
  margin: 10px;
  text-indent: 8px;
  resize: none;
  &::placeholder {
    color: white;
  }
`;

const ContentInput = styled.textarea`
  display: flex;
  width: 1223px;
  height: 380px;
  border-radius: 10px;
  background: ${(props) => props.theme.color.inputcolor};
  color: white;
  text-indent: 8px;
  resize: none;
  &::placeholder {
    color: white;
  }
`;

export {
  WrappingInput,
  TitleInput,
  MainBackground,
  ContentInput,
  WrappingBtnAndInput,
  WrappingTitleAndBtn,
  WrappingBtns,
  TitleText,
  CancelBtn,
  RegisterBtn
};