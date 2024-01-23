import React, { useState } from 'react';
import { supabase } from 'shared/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { StyledSignup, StyledForm, StyledInput, StyledButton, StyledH1, StyledLabel, StInputGroup } from './styles';
interface FormData {
  email: string;
  password: string;
  displayName: string;
}

const isValidPassword = (password: string) => {
  // 비밀번호 유효성 검사: 8~16자 영문, 숫자, 특수문자를 조합
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
  return regex.test(password);
};
const isValidConfirmPassword = (password: string, confirmPassword: string) => {
  // 비밀번호 확인 검사
  return password === confirmPassword;
};

const isValidEmail = (email: string) => {
  // 이메일 형식 검사
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isValidPasswordlength = (password: string) => {
  // 비밀번호 길이 검사
  return password.length >= 8;
};

const isValidDisplayName = (displayName: string) => {
  // 닉네임 길이 검사
  return displayName.length >= 2 && displayName.length <= 6;
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

function Signup() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    displayName: ''
  });

  const handleCheckNickname = async () => {
    if (!isValidDisplayName(formData.displayName)) {
      alert('닉네임은 최소 2자,최대 6자로 설정해주세요');
      return;
    }
    const isDuplicate = await checkNickname(formData.displayName);
    if (isDuplicate) {
      alert('이미 사용중인 닉네임입니다. 다른 닉네임을 선택해주세요.');
    } else {
      alert('사용 가능한 닉네임입니다.');
    }
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 비밀번호 확인 변경 핸들러
    setConfirmPassword(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      alert('유효한 이메일 형식이 아닙니다.');
      return;
    }
    if (!isValidPassword(formData.password)) {
      alert('비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 모두 포함해야 합니다.');
      return;
    }

    if (!isValidPasswordlength(formData.password)) {
      alert('비밀번호는 최소 8자리 이상이어야 합니다.');
      return;
    }

    if (!isValidConfirmPassword(formData.password, confirmPassword)) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (!isValidDisplayName(formData.displayName)) {
      alert('닉네임은 최소 2자리, 최대 6자리로 작성해주세요.');
      return;
    }

    // const isDeduplication = await checkNickname(formData.displayName);
    // if (isDeduplication) {
    //   alert('이미 사용죽인 닉네임입니다, 다른 닉네임을 사용해주세요');
    //   return;
    // }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            displayName: formData.displayName
          }
        }
      });
      if (error) {
        console.error(error.name);
        alert('중복된 이메일 입니다 다른 이메일을 사용해주세요');
      }
      if (error) {
        console.error(error);
        alert('ID와 password를 확인해주세요');
      } else {
        console.log(data);
        alert('회원가입을 환영합니다');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during signup');
    }
  };

  return (
    <StyledSignup>
      <StyledH1>회원 가입</StyledH1>
      <StyledForm onSubmit={handleSignup}>
        <StInputGroup>
          {' '}
          <StyledLabel htmlFor="displayName">닉네임</StyledLabel>
          <StyledInput
            placeholder="사용할 닉네임을 적어주세요."
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />
          {errors.displayName && <p>{errors.displayName}</p>}
        </StInputGroup>
        <button onClick={handleCheckNickname} type="button">
          닉네임 중복 확인
        </button>

        <StInputGroup>
          <StyledLabel htmlFor="email">이메일</StyledLabel>
          <StyledInput
            placeholder="이메일을 입력해 주세요."
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </StInputGroup>
        <StInputGroup>
          <StyledLabel htmlFor="password">비밀번호</StyledLabel>
          <StyledInput
            placeholder="비밀번호를 입력해 주세요."
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
          <StyledLabel htmlFor="password">8~16자 영문, 숫자, 특수문자를 조합해 주세요.</StyledLabel>
        </StInputGroup>
        <StInputGroup>
          <StyledLabel htmlFor="confirmPassword">비밀번호 확인</StyledLabel>
          <StyledInput
            placeholder="비밀번호 확인"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />

          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          <StyledLabel htmlFor="password">비밀번호를 한번 더 입력해 주세요.</StyledLabel>
        </StInputGroup>

        <StyledButton type="submit">회원가입</StyledButton>
      </StyledForm>
    </StyledSignup>
  );
}

export default Signup;
