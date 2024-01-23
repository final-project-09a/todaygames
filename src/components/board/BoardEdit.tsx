import { useState } from 'react';
import styled from 'styled-components';
import { EditBtn } from 'pages/boardDetail/style';

export const BoardEdit = () => {
  const [isEditing, setIsEditing] = useState(false); // 수정 삭제
  const onCancelBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log('취소버튼 구현중');
  };

  const onEditDone: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log('수정완료구현중');
  }; //수정중 취소
  const onDeleteBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log('삭제버튼 구현중');
  }; // 삭제 버튼
  return (
    <>
      <StContentWrapper>
        {isEditing ? (
          <>
            <StfetchForm>
              <StTextarea />
              <>
                <StButton onClick={onCancelBtn}>취소</StButton>
                <StButton onClick={onEditDone}>수정완료</StButton>
              </>
              ;
            </StfetchForm>
          </>
        ) : (
          <>
            <StfetchForm>
              <StButton onClick={() => setIsEditing(true)}>수정</StButton>
              <StButton onClick={onDeleteBtn}>삭제</StButton>
            </StfetchForm>
          </>
        )}
      </StContentWrapper>
    </>
  );
};
const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1180px;
  height: max-content;
  margin-bottom: 30px;
  background-color: #292929;
  border-radius: 10px;
  white-space: nowrap;
  color: #ffffff;
  padding: 20px;
`;
const StTextarea = styled.textarea`
  // 수정 textarea
  display: flex;
  max-width: 1180px;
  flex-direction: column;
  gap: 10px;
  margin: 30px 0;
  width: 1200px;
  overflow: hidden;
  resize: none;
  color: ${(props) => props.theme.color.white};
`;

const StButton = styled.button`
  display: flex;
`;
const StfetchForm = styled.form`
  display: flex;
  width: 1200px;
  justify-content: center;
  margin-left: 900px;
`;
