import React, { useEffect, useState } from 'react';
import { supabasedata } from 'shared/supabase';

const MyPage = () => {
  // const [userInfo, setUserInfo] = useState(null);

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     try {
  //       const user = supabasedata.user();

  //       if (user) {
  //         // Fetch user info from the 'users' table
  //         const { data, error } = await supabasedata
  //           .from('users')
  //           .select('email', 'id', 'avatar_url', 'username')
  //           .eq('id', user.id)
  //           .single();

  //         if (error) {
  //           console.error('Error fetching user info:', error.message);
  //         } else {
  //           setUserInfo(data);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user info:', error.message);
  //     }
  //   };

  //   fetchUserInfo();
  // }, []);

  return (
    <div>
      <h2>My Page</h2>
      {/* {userInfo ? (
        <>
          <p>Email: {userInfo.email}</p>
          <p>ID: {userInfo.id}</p>
          <p>Avatar URL: {userInfo.avatar_url}</p>
          <p>Username: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
          <p>ID: {userInfo.id}</p>
          <p>Avatar URL: {userInfo.avatar_url}</p>
          <p>Username: {userInfo.username}</p>
        </>
      ) : (
        <p>Loading user information...</p>
      )} */}
    </div>
  );
};

export default MyPage;
