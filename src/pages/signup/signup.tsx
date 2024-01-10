import React, { useState } from 'react';
import { supabasedata } from 'shared/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { StyledSignup, StyledForm, StyledInput, StyledButton, StyledH1, StyledLabel } from './styles';
interface FormData {
  // displayname: string;
  email: string;
  password: string;
}

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    // displayname: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data, error } = await supabasedata.auth.signUp({
        email: formData.email,
        password: formData.password
        // options: {
        //     displayname: formData.displayname
        //   }
      });

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

        <StyledButton type="submit">가입하기</StyledButton>
      </StyledForm>

      <Link to="/login">
        <StyledButton>로그인 하러 가기</StyledButton>
      </Link>
    </StyledSignup>
  );
}

export default Signup;
