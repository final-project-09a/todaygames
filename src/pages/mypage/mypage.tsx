import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import {
  StProfileCount,
  StUserinfoBox,
  StNickNameCount,
  StUserInfoContainer,
  StMypageContainer,
  StButtonContainer,
  StTagWrapper,
  StCancelIcon,
  StErrorMessage
} from './styles';
import MypageNav from 'components/mypage/MypageNav';
import { useDispatch } from 'react-redux';
import { UserData, setUser } from '../../redux/modules/userSlice';
import Button from 'common/Button';
import { GENRE_NAME, Genre } from 'constants/genre';
import { useState } from 'react';
import Tag from 'common/Tag';
import cancelIcon from 'assets/icons/cancelIcon.svg';
import { supabase } from 'shared/supabase';

const MyPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const { id, email, nickname, profile, genres } = user || {};
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [nicknameError, setNicknameError] = useState<string>('');
  const [profileError, setProfileError] = useState<string>('');

  const isButtonDisabled = !(
    nickname &&
    nickname.length >= 2 &&
    nickname.length <= 6 &&
    profile &&
    profile.length >= 10
  );

  const handleProfileChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setUser({ ...user, profile: e.target.value } as UserData));
    setProfileError(e.target.value.length < 10 ? '프로필은 최소 10글자 이상이어야 합니다.' : '');
  };

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUser({ ...user, nickname: e.target.value } as UserData));
    setNicknameError(
      e.target.value.length < 2 || e.target.value.length > 6 ? '닉네임은 최소 2글자, 최대 6글자로 작성해주세요.' : ''
    );
  };

  const handleGenresChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    if (selectedOption && !selectedGenres.includes(selectedOption)) {
      setSelectedGenres((prev) => [...prev, selectedOption]);
    }
  };

  const handleCancelIconClick = (genreToRemove: string) => {
    setSelectedGenres((prev) => prev.filter((genre) => genre !== genreToRemove));
  };

  // 수정버튼 클릭 핸들러 -> supabase에 user정보 업데이트
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nickname || nickname.length < 2 || nickname.length > 6 || !profile || profile.length < 10) {
      alert('닉네임과 프로필 소개(10~200자) 글자수를 확인해주세요.');
    }

    supabase
      .from('userinfo')
      .update({ email, nickname, profile, genres })
      .eq('id', id)
      .then((response) => {
        if (response.error) {
          console.error('supabase 유저 정보 업데이트 에러: ', response.error);
          alert('프로필 업데이트 중 에러가 발생했습니다.');
        } else {
          console.log('ㅊㅋㅊㅋ');
          alert('프로필이 성공적으로 업데이트되었습니다.');
          window.location.reload();
        }
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user && (
        <StMypageContainer onSubmit={handleOnSubmit}>
          <MypageNav />
          <StUserInfoContainer>
            <StUserinfoBox>
              <h2>프로필 정보</h2>

              <label htmlFor="nickname">닉네임(필수)</label>

              <input
                id="nickname"
                type="text"
                value={nickname ? nickname : ''}
                onChange={handleNickNameChange}
                maxLength={6}
                minLength={1}
                placeholder={nickname || '닉네임 (2 ~ 6자)'}
                autoComplete="off"
              />
              <StNickNameCount>{nickname?.length ? nickname.length : '0'} / 30</StNickNameCount>
              {nicknameError && <StErrorMessage>{nicknameError}</StErrorMessage>}
              <label htmlFor="profile">프로필 소개(필수)</label>
              <textarea
                id="profile"
                value={profile ? profile : ''}
                maxLength={200}
                onChange={handleProfileChange}
                placeholder="프로필 소개 (10 ~ 200자)"
              />
              <StProfileCount>{profile?.length ? profile.length : '0'} / 200</StProfileCount>
              {profileError && <StErrorMessage>{profileError}</StErrorMessage>}
            </StUserinfoBox>
            <StUserinfoBox>
              <h2>계정 관리</h2>
              <label htmlFor="id">계정 아이디</label>
              <input id="id" type="email" placeholder={email} readOnly />
              <label htmlFor="password">비밀번호 변경</label>
              <input id="password" type="password" autoComplete="current-password" />
            </StUserinfoBox>
            <StUserinfoBox>
              <h2>관심 장르</h2>
              <label htmlFor="genres">관심장르 등록</label>
              <select id="genres" value={genres || ''} onChange={handleGenresChange}>
                <option value={genres}>관심 장르를 선택하세요</option>
                {GENRE_NAME.map((genre: Genre) => (
                  <option key={genre.tag} value={genre.tag}>
                    {genre.tag}
                  </option>
                ))}
              </select>
              <StTagWrapper>
                {selectedGenres.map((genre) => (
                  <Tag key={genre} size="medium" backgroundColor="lightgray">
                    {genre}
                    <StCancelIcon src={cancelIcon} alt="취소버튼" onClick={() => handleCancelIconClick(genre)} />
                  </Tag>
                ))}
              </StTagWrapper>
            </StUserinfoBox>
            <StButtonContainer>
              <Button type="submit" size="medium" disabled={isButtonDisabled}>
                수정하기
              </Button>
            </StButtonContainer>
          </StUserInfoContainer>
        </StMypageContainer>
      )}
    </>
  );
};

export default MyPage;
