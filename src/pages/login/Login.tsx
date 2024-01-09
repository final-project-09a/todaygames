import React, { useState } from 'react';
import { supabasedata } from 'shared/supabase';

interface FormData {
  // displayname: string;
  email: string;
  password: string;
}

function Login() {
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

  const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabasedata.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
        // options: {
        //     displayname: formData.displayname
        //   }
      });

      if (error) {
        console.error(error);
        alert('ID 와 password를 확인해주세요');
      } else {
        console.log(data);
        alert('로그인 성공!');
        // You can redirect or perform other actions upon successful login
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during login');
    }
  };

  return (
    <div className="login">
      <h1>로그인</h1>
      <form onSubmit={handlelogin}>
        {/* <div>
          <label htmlFor="displayname">이메일</label>
          <input type="displayname" id="displayname" name="displayname" value={formData.displayname} onChange={handleChange} />
          {errors.displayname && <p>{errors.displayname}</p>}
        </div> */}
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
    </div>
  );
}

export default Login;
