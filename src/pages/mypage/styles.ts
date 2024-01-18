import styled from 'styled-components';

export const StLabel = styled.label`
  color: ${(props) => props.theme.color.black};
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StBackground = styled.div`
  background-color: #f7f9f9;
`;
export const StUserinfoBOx = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: ${(props) => props.theme.color.white};
  padding: 20px;
  margin: 20px auto;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  width: 80%; // 박스 크기 조절
  color: ${(props) => props.theme.color.black};
`;

// export const Sth1 = styled.h1`
//   color: ${(props) => props.theme.color.black};
// `;

export const StUserinfoBOxTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #f1f1f1;
  padding: 20px;
  margin: 20px auto;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  background-color: ${(props) => props.theme.color.black};
  width: 100%;
`;

export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 20px;
`;

export const Username = styled.h3`
  font-size: ${(props) => props.theme.fontSize.xxxl};
  color: ${(props) => props.theme.color.white};
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

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const ProfileBox = styled.div`
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin: 20px;
  padding: 20px;
  /* border: 1px solid #ddd; */
  border-radius: 10px;
  /* width: calc(100% - 40px); */
  width: 95%;
  background-color: ${(props) => props.theme.color.white};
`;

export const ProfileTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSize.xxl};
  color: ${(props) => props.theme.color.black};
  margin-bottom: 10px;
`;

export const ProfileInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
  height: 50px;

  margin-right: 10px;
  size: 95px;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.color.primary};
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

export const CharacterCount = styled.div`
  text-align: right;
  margin-top: 5px;
  font-size: 0.875rem;
  color: #666;
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
