import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import { StMypageContainer } from './styles';
import MypageNav from 'components/mypage/MypageNav';
import { useState } from 'react';
import MyBookMark from 'components/mypage/MyBookMark';
import MyCommunity from 'components/mypage/MyCommunity';
import EditProfile from 'components/mypage/EditProfile';

const MyPage = () => {
  const user = useSelector((state: RootState) => state.userSlice.userInfo);

  const [selectedCategory, setSelectedCategory] = useState<string>('profile');
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user && (
        <StMypageContainer>
          <MypageNav selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
          {selectedCategory === 'profile' && <EditProfile />}
          {selectedCategory === 'community' && <MyCommunity />}
          {selectedCategory === 'bookmark' && <MyBookMark />}
        </StMypageContainer>
      )}
    </>
  );
};

export default MyPage;
