import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import userimg from 'assets/img/userimg.png';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import { supabase } from 'types/supabase';
import { TbMessageCircle2Filled } from 'react-icons/tb';
import { FaHeart } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import { nowdate } from 'api/nowdate';

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
      if (!user) return;

      if (e.target) {
        const selectedFile = e.target.files;
        if (selectedFile && selectedFile.length > 0) {
          const file = selectedFile[0];
          const filePath = `${user.id}${nowdate()}`;

          // 버킷에서 파일 목록을 가져옵니다.
          const { data: files, error } = await supabase.storage.from('avatars').list();

          // 에러 처리
          if (error) {
            console.error('Error fetching files: ', error);
            return;
          }

          // 현재 사용자의 uid를 포함한 파일만 선택하여 삭제합니다.
          const filesToDelete = files.filter((file) => file.name.includes(user.id)).map((file) => file.name);

          // 선택된 파일들을 삭제합니다.
          const { error: deleteError } = await supabase.storage.from('avatars').remove(filesToDelete);

          // 에러 처리
          if (deleteError) {
            console.error('Error deleting files: ', deleteError);
          }

          // 새 파일을 업로드합니다.
          const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

          if (uploadError) {
            console.error('Error uploading image:', uploadError.message);
            return;
          }

          const { data: publicURL } = await supabase.storage.from('avatars').getPublicUrl(filePath);
          const uploadedImageUrls = publicURL.publicUrl;

          const { error: updateError } = await supabase
            .from('userinfo')
            .update({ avatar_url: uploadedImageUrls })
            .eq('id', user.id);

          if (updateError) {
            console.error('Error updating avatar_url:', updateError.message);
            alert('프로필 이미지 업데이트 실패');
          } else {
            alert('프로필 이미지 업데이트 성공');
            window.location.reload();
          }
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
