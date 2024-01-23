import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import boomarkIcon from 'assets/icons/boomarkIcon.svg';
import communityIcon from 'assets/icons/communityIcon.svg';
import editProfileIcon from 'assets/icons/editProfileIcon.svg';
import userimg from 'assets/img/userimg.png';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/modules/userSlice';
import { supabase } from 'shared/supabase';
interface MypageProps {
  onCategoryChange: (category: string) => void;
}

const MypageNav = ({ onCategoryChange }: MypageProps) => {
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const dispatch = useDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState(user?.profile ? user.profile : userimg);

  // 이미지를 업로드하면 base64로 바꿔 imgurl로 저장함

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target) {
        const selectedFile = e.target.files;
        if (selectedFile && selectedFile.length > 0) {
          const fileReader = new FileReader();
          fileReader.onload = async (event) => {
            if (event.target) {
              const imageUrl = event.target.result as string;
              setImageUrl(imageUrl);

              if (user) {
                // id가 존재하는지 확인
                // 'userinfo' 테이블의 'avatar_url' 업데이트
                const { error } = await supabase.from('userinfo').update({ avatar_url: imageUrl }).eq('id', user.id);
                if (error) {
                  console.log('프로필 이미지 업데이트 중 에러가 발생했습니다:', error.message);
                  alert('이미지 업로드 오류');
                } else {
                  console.log('프로필 이미지가 성공적으로 업데이트되었습니다.');
                  alert('이미지 업로드 성공!');
                  window.location.reload();
                }
              } else {
                console.log('유저 ID가 존재하지 않습니다.');
                alert('유저 ID가 존재하지 않습니다.');
              }
            }
          };
          fileReader.readAsDataURL(selectedFile[0]);
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

  console.log(imageUrl);
  return (
    <StContainer>
      <StUserProfileWrapper>
        <StProfileImageWrapper>
          {/* <img src={user?.profile ? user.profile : userimg} alt="프로필이미지" /> */}
          <img src={user?.avatar_url} alt="프로필이미지" />
        </StProfileImageWrapper>
        <a onClick={triggerFileInput}>프로필 이미지 변경</a>
        <p>{user?.nickname ? user.nickname : 'KAKAO USER'}</p>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </StUserProfileWrapper>
      <StCategoryWrapper>
        <StCategory onClick={() => onCategoryChange('profile')}>
          <StEditProfileIcon />
          <p>프로필 편집</p>
        </StCategory>
        <StCategory onClick={() => onCategoryChange('community')}>
          <StCommunityIcon />
          <p>내가 쓴 글</p>
        </StCategory>
        <StCategory onClick={() => onCategoryChange('bookmark')}>
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

const StCategory = styled.div`
  cursor: pointer;
`;
