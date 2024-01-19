import styled from 'styled-components';

export const StMypageContainer = styled.div`
  margin: 50px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const StUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

export const StUserinfoBOx = styled.div`
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
  }
  & label {
    font-size: 14px;
    font-weight: 400;
    margin-top: 30px;
    margin-bottom: 10px;
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
`;

export const StInput = styled.input`
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
`;

export const StCount = styled.div`
  color: #999;
  text-align: right;
  font-size: 14px;
  font-weight: 400;
  line-height: 15px;
  margin-top: 15px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const StLabel = styled.label`
  color: ${(props) => props.theme.color.black};
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 20px;
`;

export const UserDetail = styled.p`
  font-size: 16px;
  color: #555;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 60px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: none; // 사용자가 텍스트 영역 크기를 조절하지 못하도록
`;

export const ManageButton = styled.button`
  padding: 8px 30px;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.primary};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  height: 100%;
  text-align: center;
  display: flex;
  margin-bottom: 15px;

  &:hover {
    background-color: ${(props) => props.theme.color.secondary};
  }
`;
