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
  padding-top: 25px;
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
  width: fit-content;
  height: 158px;
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: #232323;
  border-radius: 10px;
  /* padding: 5px 0px 30px 0px; */
`;

const Titles = styled.div`
  width: 1223px;
  height: 46px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TitleInput = styled.textarea`
  display: flex;
  width: 1173px;
  height: 46px;
  border-radius: 10px;
  background: ${(props) => props.theme.color.inputcolor};
  color: white;
  text-indent: 8px;
  font-size: 20px;
  padding-top: 10px;
  resize: none;
  &::placeholder {
    color: white;
  }
`;

const GameSelect = styled.textarea`
  display: flex;
  width: 1173px;
  height: 46px;
  border-radius: 10px;
  background: ${(props) => props.theme.color.inputcolor};
  color: white;
  text-indent: 8px;
  resize: none;
  &::placeholder {
    color: white;
  }
`;

const TagSelect = styled.select`
  display: flex;
  width: 1173px;
  height: 46px;
  border-radius: 10px;
  background: ${(props) => props.theme.color.inputcolor};
  color: white;
  text-indent: 8px;
  resize: none;
  &::placeholder {
    color: white;
  }
`;

const TextSpace = styled.div`
  width: 30px;
  height: 20px;
  font-size: 16px;
`;

const ContentInput = styled.textarea`
  display: flex;
  width: 1223px;
  height: 418px;
  margin-top: 10px;
  border-radius: 10px;
  background: ${(props) => props.theme.color.inputcolor};
  color: white;
  text-indent: 8px;
  resize: none;
  padding-top: 10px;
  font-size: 16px;
  &::placeholder {
    color: white;
  }
`;

const BottomBtn = styled.div`
  display: flex;
  flex-direction: row;
  width: 1223px;
  height: 47px;
`;

const ImageUploadBtn = styled.button`
  border-radius: 10px;
  width: 143px;
  height: 47px;
  background-color: #e7e7e7;
  color: #666666;
  margin: 20px 0px 20px 0px;
  cursor: pointer;
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
  WrappingAllComponents,
  TextSpace,
  ImageUploadBtn,
  BottomBtn,
  TagSelect,
  GameSelect
};
