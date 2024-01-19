import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { RootState } from 'redux/config/configStore';
import {
  StUserinfoBOx,
  Avatar,
  Username,
  UserWrapper,
  ProfileBox,
  ProfileTitle,
  ProfileInput,
  Textarea,
  CharacterCount,
  StUserinfoBOxTop,
  ManageButton,
  StBackground,
  StLabel,
  InputGroup
} from './styles';
import userimg from 'assets/img/userimg.png';
import { supabase } from 'shared/supabase';

const MyPage = () => {
  const [profile, setProfile] = useState('');
  console.log(profile);

  // userSlice의 상태관리를 위해 상태 가져오기
  const user = useSelector((state: RootState) => state.userSlice.userInfo);

  const handleProfileChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfile(e.target.value);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleProfileUpdate = async () => {
    const { error } = await supabase.from('userinfo').update({ profile: profile }).eq('id', user.id);
  };
  return (
    <div>
      {user && (
        <StBackground>
          <StUserinfoBOxTop>
            {/* <Avatar src={user.avatar_url} alt="User Avatar" /> */}
            {/* 아바타 부분은 예시를 위해 assets 폴더에 기본이미지 추가하였습니다 */}
            {/* userinfo테이블에 url을 담는 형식이나 dkslaus수파베이스 스토리지도 사용해야할듯싶네요 */}
            <Avatar src={userimg} alt="User Avatar" />

            <UserWrapper>
              <Username>{user.username}</Username>
              {user.profile}
            </UserWrapper>
          </StUserinfoBOxTop>

          <StUserinfoBOx>
            <ProfileTitle>프로필 정보</ProfileTitle>
            <ProfileBox>
              <ProfileTitle>닉네임</ProfileTitle>
              <ProfileInput type="text" maxLength={30} placeholder={user.username || '닉네임 수정'} />
              <ProfileTitle>프로필 소개</ProfileTitle>
              <Textarea value={profile} onChange={handleProfileChange} placeholder="프로필 소개를 입력하세요." />
              <CharacterCount>{profile.length} / 200</CharacterCount>
              <ManageButton onClick={handleProfileUpdate}>업로드</ManageButton>
            </ProfileBox>
          </StUserinfoBOx>
          <StUserinfoBOx>
            <ProfileTitle>계정 관리</ProfileTitle>
            <ProfileBox>
              {' '}
              <StLabel htmlFor="email">이메일</StLabel>
              <InputGroup>
                <ProfileInput id="email" type="email" placeholder={user.email} />
                <ManageButton>관리</ManageButton>
              </InputGroup>
              <StLabel htmlFor="password">비밀번호 변경</StLabel>
              <InputGroup>
                <ProfileInput id="password" type="password" />
                <ManageButton>전송</ManageButton>
              </InputGroup>
            </ProfileBox>
          </StUserinfoBOx>
        </StBackground>
      )}
    </div>
  );
};

export default MyPage;
