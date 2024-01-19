import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootState } from 'redux/config/configStore';
import {
  StUserinfoBOx,
  StCount,
  ManageButton,
  InputGroup,
  StUserInfoContainer,
  StMypageContainer,
  StInput
} from './styles';
import userimg from 'assets/img/userimg.png';
import MypageNav from 'components/mypage/MypageNav';

const MyPage = () => {
  const [profile, setProfile] = useState('');

  // userSlice의 상태관리를 위해 상태 가져오기
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const [nickName, setNickName] = useState(user?.username ? user.username : '');

  const handleProfileChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfile(e.target.value);
  };

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  console.log(user);

  return (
    <>
      {user && (
        <StMypageContainer>
          {/* <Avatar src={user.avatar_url} alt="User Avatar" /> */}
          {/* 아바타 부분은 예시를 위해 assets 폴더에 기본이미지 추가하였습니다 */}
          {/* userinfo테이블에 url을 담는 형식이나 dkslaus수파베이스 스토리지도 사용해야할듯싶네요 */}
          <MypageNav user={user} />
          <StUserInfoContainer>
            <StUserinfoBOx>
              <h2>프로필 정보</h2>
              <label>닉네임</label>
              <StInput
                type="text"
                value={nickName}
                onChange={handleNickNameChange}
                maxLength={30}
                minLength={1}
                placeholder={user.username || '닉네임 (1 ~ 30자)'}
              />
              <StCount>{nickName.length} / 30</StCount>

              <label>프로필 소개</label>
              <textarea
                value={profile}
                maxLength={200}
                onChange={handleProfileChange}
                placeholder="프로필 소개 (0 ~ 200자)"
              />
              <StCount>{profile.length} / 200</StCount>
            </StUserinfoBOx>
            <StUserinfoBOx>
              <h2>계정 관리</h2>
              <label htmlFor="email">이메일</label>
              <InputGroup>
                <input id="email" type="email" placeholder={user.email} />
                {/* <ManageButton>관리</ManageButton> */}
              </InputGroup>
              <label htmlFor="password">비밀번호 변경</label>
              <InputGroup>
                <input id="password" type="password" />
                {/* <ManageButton>전송</ManageButton> */}
              </InputGroup>
            </StUserinfoBOx>
          </StUserInfoContainer>
        </StMypageContainer>
      )}
    </>
  );
};

export default MyPage;
