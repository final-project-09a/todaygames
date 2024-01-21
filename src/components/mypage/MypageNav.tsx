import React, { useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import boomarkIcon from 'assets/icons/boomarkIcon.svg';
import communityIcon from 'assets/icons/communityIcon.svg';
import editProfileIcon from 'assets/icons/editProfileIcon.svg';
import userimg from 'assets/img/userimg.png';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import { supabase } from 'shared/supabase';
import { useState } from 'react';

const MypageNav = () => {
  const user = useSelector((state: RootState) => state.userSlice.userInfo);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files;
    console.log('Selected file:', selectedFile);
  }, []);

  const triggerFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [fileInputRef]);

  // const profileImageUrl = useMemo(() => (user?.profile ? user.profile : userimg), [user]);

  return (
    <StContainer>
      <StUserProfileWrapper>
        <StProfileImageWrapper>
          <img src={user?.profile ? user.profile : userimg} alt="프로필이미지" />
        </StProfileImageWrapper>
        <a onClick={triggerFileInput}>프로필 이미지 변경</a>
        <p>{user?.nickname}</p>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
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
  user-select: none;
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
  & a {
    font-size: 11px;
    font-weight: 300;
    margin-top: 15px;
    color: gray;
  }
  & p {
    font-size: 14px;
    font-weight: 400;
    margin-top: 15px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(prosp) => prosp.theme.color.black};
  & p {
    font-size: 8px;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
