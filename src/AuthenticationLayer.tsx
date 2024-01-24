import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/modules/userSlice';
import { supabase } from 'types/supabase';

const AuthenticationLayer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        supabase
          .from('userinfo')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then((response) => dispatch(setUser(response.data)));
      } else {
        dispatch(setUser(null));
      }
    });

    // clean up
    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, [dispatch]);

  return children;
};

export default AuthenticationLayer;
