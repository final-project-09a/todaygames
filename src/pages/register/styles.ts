import styled from 'styled-components';

const MainBackground = styled.div`
  width: 100%;
  display: flex;
  background: #717171;
`;

const WrappingInput = styled.form`
  margin-top: 20px;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.textarea`
  display: flex;
  width: 90%;
  height: 50px;
  border-radius: 10px;
  background-color: #2e2f3f;
  color: white;
  margin: 10px;
  text-indent: 8px;
`;

const ContentInput = styled.textarea`
  display: flex;
  width: 90%;
  height: 380px;
  border-radius: 10px;
  background-color: #2e2f3f;
  color: white;
  text-indent: 8px;
`;

export { WrappingInput, TitleInput, MainBackground, ContentInput };
