//  게시판 상세 왼쪽 카테고리 리스트 컴포넌트 <디자인 미정>

import React from 'react';
import styled from 'styled-components';

export const BoardCategory = () => {
  return (
    <React.Fragment>
      <StboardLeftCategory>
        <label>정렬</label>
      </StboardLeftCategory>
    </React.Fragment>
  );
};

const StboardLeftCategory = styled.form`
  display: flex;
  width: 30%;
  overflow-y: auto;
  &label {
    padding: 20px;
  }
`;
