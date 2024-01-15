import React, { useState } from 'react';
import { supabase, supabasedata } from 'shared/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { StyledLogin, StyledForm, StyledInput, StyledButton, StyledH1, StyledLabel, StkakaoButton } from './styles';
import kakaologo from 'assets/img/kakao_login_medium_wide.png';
interface FormData {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  // const { user, session } = supabasedata.auth.session()
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(supabasedata.auth);
    try {
      const { data, error } = await supabasedata.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        console.error(error);
        alert('ID와 password를 확인해주세요');
      } else {
        console.log(data.user.id);

        alert('로그인 성공!');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      alert('로그인 중에 오류가 발생했습니다');
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabasedata.auth.signOut();
      if (error) {
        console.error(error);
        alert('로그아웃 중에 오류가 발생했습니다');
      } else {
        alert('로그아웃 성공!');
        // You can redirect or perform other actions upon successful logout
      }
    } catch (error) {
      console.error(error);
      alert('로그아웃 중에 오류가 발생했습니다');
    }
  };

  const kakaologin = async function signInWithKakao() {
    const { data, error } = await supabasedata.auth.signInWithOAuth({
      provider: 'kakao'
    });
  };

  // const googlelogin = async function signInWithgoogle() {
  //   const { data, error } = await supabasedata.auth.signInWithOAuth({
  //     provider: 'google',
  //     options: {
  //       queryParams: {
  //         access_type: 'offline',
  //         prompt: 'consent'
  //       }
  //     }
  //   });
  // }; 앱 배포 후에 구글로그인 도입가능

  return (
    <StyledLogin>
      <StyledH1>로그인</StyledH1>
      <StyledForm onSubmit={handlelogin}>
        <StyledLabel htmlFor="email">이메일</StyledLabel>
        <StyledInput
          placeholder="아이디를 입력하세요"
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

        <StyledButton type="submit">로그인하기</StyledButton>
      </StyledForm>
      <StkakaoButton onClick={kakaologin}>카카오로그인</StkakaoButton>
      {/* <img src={kakaologo} width="222" alt="카카오 로그인 버튼" />  정식카카오로그인 로고사용준비완료*/}
      <Link to="/signup">
        <StyledButton>회원 가입</StyledButton>
      </Link>
    </StyledLogin>
  );
}

export default Login;
