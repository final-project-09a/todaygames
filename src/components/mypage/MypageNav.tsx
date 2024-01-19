import React from 'react';
import styled from 'styled-components';
import boomarkIcon from 'assets/icons/boomarkIcon.svg';
import communityIcon from 'assets/icons/communityIcon.svg';
import editProfileIcon from 'assets/icons/editProfileIcon.svg';

const MypageNav = ({ user }: any) => {
  return (
    <StContainer>
      <StUserProfileWrapper>
        <StProfileImageWrapper>
          <img src={user.profile} alt="프로필이미지" />
        </StProfileImageWrapper>
        <p>딱딱한 바게트빵</p>
      </StUserProfileWrapper>
      <StCategoryWrapper>
        <div>
          <StEditProfileIcon />
          <p>프로필 편집</p>
        </div>
        <div>
          <StCommunityIcon />
          <p>커뮤니티</p>
        </div>
        <div>
          <StBookMarkIcon />
          <p>찜 목록</p>
        </div>
      </StCategoryWrapper>
    </StContainer>
  );
};

export default MypageNav;

const StContainer = styled.div`
  width: 160px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StUserProfileWrapper = styled.div`
  width: 100%;
  padding: 30px 10px;
  border-radius: 10px;
  background: ${(prosp) => prosp.theme.color.gray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  & h {
    font-size: 14px;
    font-weight: 400;
  }
`;

const StCategoryWrapper = styled.div`
  width: 160px;
  border-radius: 10px;
  background: ${(prosp) => prosp.theme.color.gray};
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  & div {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const StProfileImageWrapper = styled.figure`
  width: 82px;
  height: 82px;
  border-radius: 50%;
  overflow: hidden;
  background: ${(prosp) => prosp.theme.color.black};
`;

const StEditProfileIcon = styled.div`
  width: 24px;
  height: 24px;
  background: url(${editProfileIcon}) no-repeat center center;
`;

const StCommunityIcon = styled.div`
  width: 24px;
  height: 24px;
  background: url(${communityIcon}) no-repeat center center;
`;

const StBookMarkIcon = styled.div`
  width: 24px;
  height: 24px;
  background: url(${boomarkIcon}) no-repeat center center;
`;
