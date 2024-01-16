import styled from 'styled-components';

const MainBackground = styled.div`
  width: 100%;
  display: flex;
  background-color: ${(props) => props.theme.color.black};
  justify-content: center;
`;

const WrappingAllComponents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  height: 708px;
  background-color: ${(props) => props.theme.color.postback};
  border-radius: 10px;
`;

const WrappingBtnAndInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
`;

const WrappingTitleAndBtn = styled.div`
  width: 1270px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 60px 0px 20px 0px;
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
  border-radius: 10px;
  padding: 5px 0px 30px 0px;
`;

const Titles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  RegisterBtn,
  Titles,
  WrappingAllComponents
};
