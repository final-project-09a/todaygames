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
      let uploadedImageUrls = '';
      if (e.target) {
        const selectedFile = e.target.files;
        if (selectedFile && selectedFile.length > 0) {
          const file = selectedFile[0];
          // 공백 제거 및 특수 문자 대체
          const safeUserName = user?.nickname?.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '_');
          // 파일 이름을 안전한 형태로 변환
          const safeFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
          const today = new Date();
          const formattedYear = today.getFullYear().toString().slice(-2);
          const formattedMonth = (today.getMonth() + 1).toString().padStart(2, '0');
          const formattedDate = today.getDate().toString().padStart(2, '0');
          const formattedHour = today.getHours().toString().padStart(2, '0');
          const formattedMinute = today.getMinutes().toString().padStart(2, '0');
          const formattedSecond = today.getSeconds().toString().padStart(2, '0');
          const formattedFull = `${formattedYear}Y ${formattedMonth}M ${formattedDate}D ${formattedHour}H ${formattedMinute}M ${formattedSecond}S`;

          // const filePath = `${safeUserName}/${safeFileName}`;
          const filePath = `${user?.id}${formattedFull}`;

          // 먼저 이미지를 업로드 시도합니다.
          const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

          // 업로드에 실패한 경우
          if (uploadError) {
            console.error('Error uploading image:', uploadError.message);

            // 다시 이미지를 업로드합니다.
            const { error: retryUploadError } = await supabase.storage.from('avatars').update(filePath, file);
            if (retryUploadError) {
              console.error('Error uploading image:', retryUploadError.message);
              alert('이미지 업로드 실패');
              return;
            }
          }
          // 업로드에 성공한 경우, 이미지의 URL을 가져옵니다.
          const { data: publicURL } = await supabase.storage.from('avatars').getPublicUrl(filePath);
          uploadedImageUrls = publicURL.publicUrl;
          alert('이미지 업로드 성공');
          console.log(uploadedImageUrls);

          const { error: updateError } = await supabase
            .from('userinfo')
            .update({ avatar_url: uploadedImageUrls })
            .eq('id', user?.id);

          // 업데이트에 실패한 경우
          if (updateError) {
            console.error('Error updating avatar_url:', updateError.message);
            alert('프로필 이미지 업데이트 실패');
          } else {
            alert('프로필 이미지 업데이트 성공');
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
