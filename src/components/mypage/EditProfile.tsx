import Button from 'common/Button';
import Tag from 'common/Tag';
import { StTagWrapper } from 'components/Header/styles';
import { GENRE_NAME } from 'constants/genre';
import {
  StButtonContainer,
  StCancelIcon,
  StErrorMessage,
  StNickNameCount,
  StProfileCount,
  StUserInfoContainer,
  StUserinfoBox
} from 'pages/mypage/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import { UserData, setUser } from '../../redux/modules/userSlice';
import { supabase } from 'types/supabase';
import cancelIcon from 'assets/icons/cancelIcon.svg';
import { GenreNameType } from 'types/games';

const EditProfile = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const { id, email, nickname, profile, genres } = user || {};
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [nicknameError, setNicknameError] = useState<string>('');
  const [profileError, setProfileError] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const isButtonDisabled = !(
    nickname &&
    nickname.length >= 2 &&
    nickname.length <= 6 &&
    profile &&
    profile.length >= 10 &&
    isValid
  );

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const isValidPassword = (password: string) => {
    // 비밀번호 유효성 검사: 8~16자 영문, 숫자, 특수문자를 조합
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
    return regex.test(password);
  };
  const isValidConfirmPassword = (password: string, confirmPassword: string) => {
    // 비밀번호 확인 검사
    return password === confirmPassword;
  };

  const updatePassword = async () => {
    if (!isValidPassword(newPassword)) {
      alert('비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 모두 포함해야 합니다.');
      return;
    }

    if (!isValidConfirmPassword(newPassword, confirmPassword)) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      console.error('Error updating password', error);
      alert('비밀번호 업데이트 중 에러가 발생했습니다.');
    } else {
      alert('비밀번호가 성공적으로 업데이트되었습니다.');
      setNewPassword('');
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setUser({ ...user, profile: e.target.value } as UserData));
    setProfileError(e.target.value.length < 10 ? '프로필은 최소 10글자 이상이어야 합니다.' : '');
  };

  const checkNickname = async (nickname: string) => {
    // 닉네임 중복 검사 (userinfo테이블 기준입니다 /mypage에서 닉네임 변경할때도 userinfo만 변경됩니다)
    const { data, error } = await supabase.from('userinfo').select('nickname').eq('nickname', nickname);
    if (error) {
      console.log('닉네임 중복 검사 에러');
      return;
    }
    return data.length > 0;
    //닉네임 중복이 맞다면 true를 뱉어냄
  };

  const handleNickNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;

    dispatch(setUser({ ...user, nickname: nickname } as UserData));

    if (nickname.length < 2 || nickname.length > 6) {
      setNicknameError('닉네임은 최소 2글자, 최대 6글자로 작성해주세요.');
      setIsValid(false); // 유효성 검사에 실패하면 isValid를 false로 설정합니다.
      return;
    }

    const isDuplicate = await checkNickname(nickname);
    if (isDuplicate) {
      setNicknameError('이미 사용 중인 닉네임입니다. 다른 닉네임을 선택해주세요.');
      setIsValid(false); // 유효성 검사에 실패하면 isValid를 false로 설정합니다.
      return;
    }

    setNicknameError(''); // 에러가 없다면 에러 메시지를 초기화합니다.
    setIsValid(true); // 모든 유효성 검사를 통과하면 isValid를 true로 설정합니다.
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
      .update({ email, nickname, profile, genres: selectedGenres })
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
    <StUserInfoContainer onSubmit={handleOnSubmit}>
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
        {/* <label htmlFor="password">비밀번호 변경</label>
        <input id="password" type="password" autoComplete="current-password" /> */}
        <input type="password" value={newPassword || ''} onChange={handlePasswordChange} />

        <input
          placeholder="비밀번호 확인"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button type="button" onClick={updatePassword}>
          비밀번호 변경
        </button>
      </StUserinfoBox>
      <StUserinfoBox>
        <h2>관심 장르</h2>
        <label htmlFor="genres">관심장르 등록</label>
        <select id="genres" value={genres || ''} onChange={handleGenresChange}>
          <option value={genres}>관심 장르를 선택하세요</option>
          {GENRE_NAME.map((genre: GenreNameType) => (
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
  );
};

export default EditProfile;
