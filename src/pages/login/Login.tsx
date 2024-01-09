import React, { useState } from 'react';
import { supabasedata } from 'shared/supabase';

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const [formData, setFormData] = useState<FormData>({
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

  const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabasedata.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        console.error(error);
        alert('ID와 password를 확인해주세요');
      } else {
        console.log(data);
        alert('로그인 성공!');
        // You can redirect or perform other actions upon successful login
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

  return (
    <div className="login">
      <h1>로그인</h1>
      <form onSubmit={handlelogin}>
        <div>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button type="submit">로그인하기</button>
      </form>

      <button onClick={handleLogout}>로그아웃하기</button>
    </div>
  );
}

export default Login;
