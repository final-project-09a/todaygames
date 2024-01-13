//  게시판 상세 왼쪽 카테고리 리스트 컴포넌트 <디자인 미정>

import React from 'react';
import styled from 'styled-components';

export const BoardCategory = () => {
  return (
    <React.Fragment>
      <StboardLeftCategory>
        <label>정렬</label>
        <select>
          <input type="radio" id="recent" />
          <input type="radio" />
        </select>
      </StboardLeftCategory>
    </React.Fragment>
  );
};

const StboardLeftCategory = styled.div``;
