import styled from 'styled-components';
import searchIcon from '../../assets/img/searchIcon.png';
import removeButton from '../../assets/img/removeButton.png';

interface DivProps {
  isVisible: boolean;
}

const MainBackground = styled.div`
  width: 1280px;
  margin: 70px auto;
  display: flex;
  justify-content: center;
`;

const WrappingTitleAndBtn = styled.div`
  width: 1270px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const WrappingBtnAndInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const WrappingAllComponents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: fit-content;
  background-color: ${(props) => props.theme.color.postback};
  border-radius: 10px;
  gap: 15px;
  padding: 30px;
`;

const TitleText = styled.h1`
  display: flex;
  font-size: 24px;
  font-weight: 700;
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
  font-weight: 500;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
`;

const WrappingInput = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 10px;
`;

const Titles = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TextSpace = styled.h2`
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
`;

const TitleInput = styled.input`
  border: none;
  display: flex;
  width: 1173px;
  height: 46px;
  border-radius: 10px;
  background: ${(props) => props.theme.color.inputcolor};
  color: ${(props) => props.theme.color.white};
  padding-left: 18px;
  font-size: 14px;
  font-weight: 400;
`;

const SearchBtn = styled.button`
  position: absolute;
  right: 1%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${searchIcon});
  background-size: contain;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  background-color: transparent;
  filter: invert(1);
  cursor: pointer;
  z-index: 1;
`;

const TagArea = styled.div`
  font-size: 20px;
  width: 1173px;
  height: 46px;
`;

const TagText = styled.div<DivProps>`
  padding: 0px 18px 0px 18px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.color.inputcolor};
  width: fit-content;
  height: 46px;
  font-size: 14px;
  font-weight: 400;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  border: none;
  background: ${(props) => props.theme.color.inputcolor};

  resize: none;
  font-size: 14px;
  padding: 20px;
  color: ${(props) => props.theme.color.white};
`;

const BottomBtn = styled.div`
  display: flex;
  flex-direction: row;
  width: 1223px;
  height: 47px;
`;

const ImageUploadBtn = styled.button`
  border-radius: 10px;
  padding: 16px 27px;
  width: fit-content;
  height: 47px;
  background-color: ${(props) => props.theme.color.white};
  cursor: pointer;

  text-align: center;
  font-size: 14px;
  font-weight: 500;
  transition: 0.2s ease;
  &:hover {
    color: ${(props) => props.theme.color.white};
    background-color: ${(props) => props.theme.color.primary};
  }
`;

const WrappingImages = styled.div`
  width: fit-content;
  margin-top: 47px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
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

const ImageBox = styled.img`
  width: 210px;
  height: 150px;
  border-radius: 10px;
`;

const RegisterBtn = styled.button`
  width: 80px;
  height: 48px;
  border-radius: 10px;
  background: ${(props) => props.theme.color.primary};
  border: 0px;

  color: white;
  font-size: 14px;
  font-weight: 500;
  line-height: 15px;
  text-align: center;
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
