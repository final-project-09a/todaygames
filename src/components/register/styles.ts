import styled from 'styled-components';

const Titles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
`;

const TitleInput = styled.textarea`
  display: flex;
  width: 1173px;
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

export { Titles, TitleInput, ContentInput };
