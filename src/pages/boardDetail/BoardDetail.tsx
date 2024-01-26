import {
  AllContainer,
  WrappingBoardDetail,
  WrappingImgText,
  UserInfoAndBtn,
  ProfileImage,
  WrappingUserInfo,
  NickNameAndDate,
  NickNameAndTitleText,
  DateText,
  EditBtn,
  DetailImage,
  DetailTitle,
  DetailContent,
  WrappingTags,
  EachTag
} from './style';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'query/keys';
import { UserInfo } from 'api/user';
import { getPosts } from 'api/post';
import { useParams } from 'react-router-dom';
import { supabase } from 'types/supabase';
import { useState } from 'react';
import { Post } from 'types/global.d';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import { PostDetail } from 'types/boardDetail.d';
import CustomCarousel from 'common/CustomCarousel';
import editBtn from '../../assets/img/editBtn.png';
import frontEnd from '../../assets/img/front-end.png';
import tower from '../../assets/img/tower-pc.png';

export const BoardDetail = () => {
  const customImages = [editBtn, frontEnd, tower];
  const { id } = useParams();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const [selectedImage, setSelectedImage] = useState<string | null>('');
  const [sliderIndex, setSliderIndex] = useState(0);

  const { data: gameData } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });

  const { data: userInfoData } = useQuery({
    queryKey: [QUERY_KEYS.USERINFO],
    queryFn: UserInfo
  });

  const filterdPost = gameData?.find((game) => game.id === id);
  const displayedImages = filterdPost?.image;

  const filteredUser = userInfoData?.filter((user) => user.id === filterdPost?.user_id).find(() => true);
  const deletePost = async (id: Post) => {
    try {
      const { data, error } = await supabase.from('posts').delete().eq('id', id);
      if (error) {
        throw error;
      }
      // 게시글 삭제 후, 페이지를 새로고침하거나
      // 다른 페이지로 이동시키는 로직을 여기에 추가할 수 있습니다.
    } catch (error) {
      alert('에러가 발생했습니다');
    }
  };
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    draggable: false,
    beforeChange: (currentSlide: number, nextSlide: number) => {
      console.log('현재 인덱스', currentSlide);
      console.log('다음 인덱스', nextSlide);
      console.log('슬라이더인덱스', sliderIndex);
      if (currentSlide !== sliderIndex) {
        currentSlide = sliderIndex;
      }

      console.log(currentSlide);
      // if (currentSlide === 0 || sliderIndex === 0) {
      //   setSelectedTag(GENRE_NAME[nextSlide]?.tag);
      // }

      // if (currentSlide === 6 || sliderIndex >= 6) {
      //   setSelectedTag(GENRE_NAME[sliderIndex + 1]?.tag);
      //   nextSlide = 7;
      // }

      // If the current slide is the clicked index, adjust the currentSlide
      // if (currentSlide === sliderIndex) {
      //   if (sliderIndex === 0) {
      //     currentSlide = 5;
      //   } else if (sliderIndex === 5) {
      //     currentSlide = 0;
      //   }
      // }
    },
    afterChange: (currentSlide: number) => {
      console.log('after 현재 인덱스', currentSlide);
      // If the current slide is 0 or 5, update the selected tag accordingly
      if (currentSlide === 0) {
        setSelectedImage(displayedImages ? displayedImages[currentSlide + 1] : null);
      }
      if (currentSlide === 6) {
        setSelectedImage(displayedImages ? displayedImages[currentSlide + 1] : null);
      }
    }
  };

  console.log(displayedImages);
  return (
    <>
      <AllContainer>
        {/*nav 제외 전체영역 컨테이너 */}
        <WrappingBoardDetail>
          {/* 게시글 상세정보 전체 */}
          <UserInfoAndBtn>
            {/* 아바타이미지, 닉네임, 날짜, 게임이름 -------edit버튼 */}
            <WrappingImgText>
              {/* 아바타이미지 || 닉네임&날짜&게임이름 */}
              <ProfileImage src={filteredUser?.avatar_url} />
              <WrappingUserInfo>
                <NickNameAndDate>
                  <NickNameAndTitleText>{filteredUser?.nickname}</NickNameAndTitleText>
                  <DateText>{filterdPost?.created_At}</DateText>
                </NickNameAndDate>
                <NickNameAndTitleText>{filterdPost?.game}</NickNameAndTitleText>
              </WrappingUserInfo>
            </WrappingImgText>
            <UserInfoAndBtn />
            <div>
              <EditBtn onClick={() => setDropdownVisible(!dropdownVisible)}></EditBtn>
              {dropdownVisible && (
                <div>
                  <button
                    onClick={() => {
                      /* 수정 기능을 구현한 함수를 호출 */
                    }}
                  >
                    수정
                  </button>
                  <button>삭제</button>
                </div>
              )}
            </div>
          </UserInfoAndBtn>
          <DetailImage />

          <DetailTitle>{filterdPost?.title}</DetailTitle>
          <DetailContent>{filterdPost?.content}</DetailContent>
          <WrappingTags>
            <EachTag>{filterdPost?.category}</EachTag>
          </WrappingTags>
          <br />
          {/* <Comment /> */}
        </WrappingBoardDetail>
      </AllContainer>
    </>
  );
};
