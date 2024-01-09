import React from 'react';
import { supabasedata } from 'shared/supabase';

export default function signup() {
  async function signUpNewUser() {
    const { data, error } = await supabasedata.auth.signUp({
      email: 'example@email.com',
      password: 'example-password',
      options: {
        emailRedirectTo: 'https://example.com/welcome'
      }
    });
  }
  return <div>signup</div>;
}
