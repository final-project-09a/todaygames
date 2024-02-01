import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import userimg from 'assets/img/userimg.png';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import { supabase } from 'types/supabase';
import { TbMessageCircle2Filled } from 'react-icons/tb';
import { FaHeart } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';

interface MypageProps {
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

interface StCategoryProps {
  $isSelected: boolean;
}

const MypageNav = ({ selectedCategory, onCategoryChange }: MypageProps) => {
  const user = useSelector((state: RootState) => state.userSlice.userInfo);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target) {
        const selectedFile = e.target.files;
        if (selectedFile && selectedFile.length > 0) {
          const file = selectedFile[0];
          // 공백 제거 및 특수 문자 대체
          const safeUserName = user?.nickname?.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '_');
          // 파일 이름을 안전한 형태로 변환
          const safeFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
          const filePath = `${safeUserName}/${safeFileName}`;

          const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
          if (uploadError) {
            console.error('Error uploading image:', uploadError.message);
            alert('이미지 업로드 실패');
            return;
          }

          alert('이미지 업로드 성공');
        }
      }
    },
    [user]
  );

  const triggerFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  }, [fileInputRef]);

  return (
    <StContainer>
      <StUserProfileWrapper>
        <StProfileImageWrapper>
          <img src={user?.avatar_url} alt="프로필이미지" />
        </StProfileImageWrapper>
        <a onClick={triggerFileInput}>프로필 이미지 변경</a>
        <p>{user?.nickname ? user.nickname : ''}</p>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </StUserProfileWrapper>
      <StCategoryWrapper>
        <StCategory onClick={() => onCategoryChange('profile')} $isSelected={selectedCategory === 'profile'}>
          <StEditProfileIcon />
          <p>프로필 편집</p>
        </StCategory>
        <StCategory onClick={() => onCategoryChange('community')} $isSelected={selectedCategory === 'community'}>
          <StCommunityIcon />
          <p>내가 쓴 글</p>
        </StCategory>
        <StCategory onClick={() => onCategoryChange('bookmark')} $isSelected={selectedCategory === 'bookmark'}>
          <StBookMarkIcon />
          <p>찜 목록</p>
        </StCategory>
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
    cursor: pointer;
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

const StEditProfileIcon = styled(IoPersonSharp)`
  font-size: 20px;
`;

const StCommunityIcon = styled(TbMessageCircle2Filled)`
  font-size: 20px;
`;

const StBookMarkIcon = styled(FaHeart)`
  font-size: 20px;
`;

const StCategory = styled.div<StCategoryProps>`
  cursor: pointer;
  & svg {
    color: ${(props) => (props.$isSelected ? 'white' : 'gray')};
  }
  & p {
    font-size: 16px;
    font-weight: 500;
    color: ${(props) => (props.$isSelected ? 'white' : 'gray')};
  }
`;
