import styled from 'styled-components';

export const StUserinfoBOx = styled.div`
  display: flex;
  flex-direction: row; // 수정된 부분
  align-items: flex-start; // 수정된 부분
  justify-content: flex-start; // 추가된 부분
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 20px; // 추가된 부분
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
