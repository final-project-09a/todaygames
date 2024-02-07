import React, { useState } from 'react';
import { supabase } from 'types/supabase';
import { Link, useNavigate } from 'react-router-dom';
import {
  StyledLogin,
  StyledInput,
  StyledButton,
  StyledH1,
  StyledLabel,
  StFormWrapper,
  StOtherLoginWrapper,
  StSignInfo,
  StLoginButton
} from './styles';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/modules/userSlice';
import googlelogo from '../../assets/img/googlelogo.png';
import kakaologo from '../../assets/img/kakaologo.png';

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        console.error(error);
        alert('ID와 password를 확인해주세요');
      } else {
        dispatch(setUser(data.user));
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      alert('로그인 중에 오류가 발생했습니다');
    }
  };

  const kakaologin = async function signInWithKakao() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao'
    });
    return data;
  };

  const googlelogin = async function signInWithgoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
    return data;
  };

  return (
    <StyledLogin>
      <StyledH1>로그인</StyledH1>
      <form onSubmit={handlelogin}>
        <StFormWrapper>
          <StyledLabel htmlFor="email">이메일</StyledLabel>
          <StyledInput
            placeholder="이메일을 입력해 주세요."
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {/* {errors.email && <p>{errors.email}</p>} */}
        </StFormWrapper>
        <StFormWrapper>
          <StyledLabel htmlFor="password">비밀번호</StyledLabel>
          <StyledInput
            placeholder="비밀번호를 입력해 주세요."
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </StFormWrapper>
        <StyledButton type="submit">로그인</StyledButton>
      </form>
      <StOtherLoginWrapper>
        <StLoginButton onClick={googlelogin}>
          <img src={googlelogo} alt="기본이미지" onClick={googlelogin} />
        </StLoginButton>
        <StLoginButton onClick={kakaologin}>
          <img src={kakaologo} alt="기본이미지" onClick={googlelogin} />
        </StLoginButton>
      </StOtherLoginWrapper>
      <StSignInfo>
        <h4>계정이 없으신가요?</h4>
        <Link to="/signup">
          <p>회원가입</p>
        </Link>
      </StSignInfo>
    </StyledLogin>
  );
}

export default Login;
