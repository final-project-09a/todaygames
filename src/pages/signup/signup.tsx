import React, { useState } from 'react';
import { supabasedata } from 'shared/supabase';
import { Link } from 'react-router-dom';
import { StyledSignup, StyledForm, StyledInput, StyledButton, StyledH1, StyledLabel } from './styles';
interface FormData {
  // displayname: string;
  email: string;
  password: string;
}

function Signup() {
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
        alert('Please check your ID and password');
      } else {
        console.log(data);
        alert('Welcome to sign up!');
        // You can redirect or perform other actions upon successful signup
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
        <StyledInput type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p>{errors.email}</p>}

        <StyledLabel htmlFor="password">비밀번호</StyledLabel>
        <StyledInput type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
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
