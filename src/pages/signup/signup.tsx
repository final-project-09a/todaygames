import React, { useState } from 'react';
import { supabase } from 'shared/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { StyledSignup, StyledForm, StyledInput, StyledButton, StyledH1, StyledLabel } from './styles';
interface FormData {
  email: string;
  password: string;
  displayName: string;
}

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

const isValidPassword = (password: string) => {
  // 비밀번호 길이 검사
  return password.length >= 6;
};

const isValidDisplayName = (displayName: string) => {
  // 닉네임 길이 검사
  return displayName.length >= 2 && displayName.length <= 10;
};

function Signup() {
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState('');

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    displayName: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
      alert('비밀번호는 최소 6자리 이상이어야 합니다.');
      return;
    }

    if (!isValidConfirmPassword(formData.password, confirmPassword)) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (!isValidDisplayName(formData.displayName)) {
      alert('닉네임은 최소 2자리, 최대 10자리로 작성해주세요.');
      return;
    }

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
        {/* <div>
          <label htmlFor="displayname">이메일</label>
          <input type="displayname" id="displayname" name="displayname" value={formData.displayname} onChange={handleChange} />
          {errors.displayname && <p>{errors.displayname}</p>}
        </div> */}
        <StyledLabel htmlFor="email">이메일</StyledLabel>
        <StyledInput
          placeholder="이메일"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}

        <StyledLabel htmlFor="password">비밀번호</StyledLabel>
        <StyledInput
          placeholder="비밀번호"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}

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

        <StyledLabel htmlFor="displayName">닉네임</StyledLabel>
        <StyledInput
          placeholder="닉네임"
          type="text"
          id="displayName"
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
        />
        {errors.displayName && <p>{errors.displayName}</p>}

        <StyledButton type="submit">가입하기</StyledButton>
      </StyledForm>

      <Link to="/login">
        <StyledButton>로그인 하러 가기</StyledButton>
      </Link>
    </StyledSignup>
  );
}

export default Signup;
