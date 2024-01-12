import React, { useEffect, useState } from 'react';
import { supabasedata } from 'shared/supabase'; // Assuming supabase is your client instance

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userInfo1, setUserInfo1] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data, error } = await supabasedata.from('userinfo').select();

        if (error) {
          console.error('Error fetching user info:', error.message);
        } else {
          // Assuming the result contains an array of objects
          if (data && data.length > 0) {
            // Assuming 'email' is a property of the first object in the array
            setUserInfo(data[0]);
            console.log(data);
            // setUserInfo1(data[0].username);
          } else {
            console.warn('No user info found.');
          }
        }
      } catch (error) {
        console.error('Error fetching user info:');
      }
    };

    fetchUserInfo();
  }, []); // The empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <h2>My Page</h2>
      {userInfo ? <p>Email: {userInfo}</p> : <p>Loading user information...</p>}
      {/* {userInfo ? <p>Email: {userInfo1}</p> : <p>Loading user information...</p>} */}
    </div>
  );
};

export default MyPage;
