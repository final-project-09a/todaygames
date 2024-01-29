import styled from 'styled-components';
import searchIcon from '../../assets/img/searchIcon.png';
import removeButton from '../../assets/img/removeButton.png';

interface DivProps {
  isVisible: boolean;
}

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
  margin-top: 100px;
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
  font-family: 'Pretendard-Regular';
  font-size: 14px;
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
  font-family: 'Pretendard-Regular';

  color: white;
  font-size: 14px;
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
  position: relative;
  width: 1223px;
  height: 46px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SearchBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background-image: url(${searchIcon});
  background-size: contain;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  border: 0px;
  background-color: transparent;
  filter: invert(1);
  cursor: pointer;
  z-index: 1;
`;

const TitleInput = styled.input`
  border: 0px;
  display: flex;
  width: 1173px;
  height: 46px;
  border-radius: 10px;
  background: ${(props) => props.theme.color.inputcolor};
  color: white;
  text-indent: 8px;
  font-size: 20px;
  resize: none;
  &::placeholder {
    color: white;
  }
  z-index: 0;
`;

const GameSelect = styled.input`
  border: 0px;
  font-size: 20px;
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

const TagArea = styled.div`
  border: 0px;
  font-size: 20px;
  display: flex;
  width: 1173px;
  height: 46px;
  border-radius: 10px;
  background: transparent;
  color: white;
  text-indent: 8px;
  resize: none;
  &::placeholder {
    color: white;
  }
`;

const TagText = styled.div<DivProps>`
  padding: 0px 6px 0px 0px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.color.inputcolor};
  width: fit-content;
  height: 46px;
  font-size: 16px;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`;

const TextSpace = styled.div`
  width: 30px;
  height: 20px;
  font-size: 16px;
`;

const GameCard = styled.button`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 250px;
  border: none;
  border-radius: 10px;
  z-index: 3;
  cursor: pointer;
  top: 0px;
  left: 0px;
  background-color: transparent;
  gap: 5px;
`;

const WrappingCardAndBtn = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const CardImage = styled.img`
  z-index: 0;
  border-radius: 10px;
  display: flex;
  width: 350px;
  height: 250px;
`;

const RemoveImgBtn = styled.button`
  width: 24px;
  height: 24px;
  border: 0px;
  z-index: 1;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  background-image: url(${removeButton});
  cursor: pointer;
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
  font-family: 'Pretendard-Regular';
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

const ImageBox = styled.img`
  width: 210px;
  height: 150px;
  border-radius: 10px;
`;

const WrappingImages = styled.div`
  width: fit-content;
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
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
  GameSelect,
  ImageBox,
  WrappingImages,
  SearchBtn,
  GameCard,
  CardImage,
  TagArea,
  TagText,
  RemoveImgBtn,
  WrappingCardAndBtn
};
