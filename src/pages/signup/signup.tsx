import React, { useState } from 'react';
import { supabasedata } from 'shared/supabase';

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
    <div className="Signup">
      <h1>회원 가입</h1>
      <form onSubmit={handleSignup}>
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

        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default Signup;
