import { getPostsWithGameName } from 'api/post';
import { UserInfoById } from 'api/user';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReviewPostType, ReviewUserType } from 'types/boardDetail';
import userimg from 'assets/img/userimg.png';
import CustomCarousel from 'common/CustomCarousel';
import { useNavigate } from 'react-router-dom';

const Review = ({ gameName }: { gameName: string }) => {
  const [postData, setPostData] = useState<ReviewPostType[] | null>(null);
  const [reviewUsers, setReviewUsers] = useState<(ReviewUserType | null)[]>([]);
  const navigate = useNavigate();

  // 해당 게임의 posts 데이터만 가져오기
  // 가져온 posts의 user 정보(닉네임, 아바타)만 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostsWithGameName(gameName);
        setPostData(data);
        if (data && data.length > 0) {
          const userIds = data.map((post) => post.user_id);
          const userInfoPromises = userIds.map((userId) => UserInfoById(userId));
          const userInfoData = await Promise.all(userInfoPromises);
          console.log(userInfoData);
          setReviewUsers(userInfoData);
        }
      } catch (error) {
        console.error('post data 패칭 오류:', error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    draggable: false,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrow: false,
    pauseOnHover: true
  };

  console.log(postData);
  console.log(reviewUsers);

  return (
    <StReviewContainer>
      <StTitle>유저들의 한줄 리뷰</StTitle>
      {postData && postData.length > 3 ? (
        <StCarouselwWrapper>
          <CustomCarousel settings={settings}>
            {postData?.map((post: ReviewPostType, index: number) => {
              const user = reviewUsers?.find((user) => user?.id === post.user_id);
              return (
                <StReviewCard key={index} onClick={() => navigate(`/boarddetail/${post.id}`)}>
                  <div>
                    {user && (
                      <section>
                        <figure>
                          <img src={user.avatar_url ? user.avatar_url : userimg} alt="아바타" />
                        </figure>
                        <h3>{user.nickname}</h3>
                      </section>
                    )}
                    <p>{post.star_rating}</p>
                  </div>
                  <p>{post.review}</p>
                </StReviewCard>
              );
            })}
          </CustomCarousel>
        </StCarouselwWrapper>
      ) : (
        <StReviewWrapper>
          {postData?.map((post: ReviewPostType, index: number) => {
            const user = reviewUsers?.find((user) => user?.id === post.user_id);
            return (
              <StReviewCard key={index} onClick={() => navigate(`/boarddetail/${post.id}`)}>
                <div>
                  {user && (
                    <section>
                      <figure>
                        <img src={user.avatar_url ? user.avatar_url : userimg} alt="아바타" />
                      </figure>
                      <h3>{user.nickname}</h3>
                    </section>
                  )}
                  <p>{post.star_rating}</p>
                </div>
                <p>{post.review}</p>
              </StReviewCard>
            );
          })}
        </StReviewWrapper>
      )}
    </StReviewContainer>
  );
};

export default Review;

const StReviewContainer = styled.div`
  width: 1440px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: hidden;
  gap: 10px;
`;

const StTitle = styled.h1`
  color: ${(props) => props.theme.color.white};
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  margin-top: 50px;
`;

const StCarouselwWrapper = styled.div`
  width: 100%;
  height: 150px;
  gap: 10px;
  margin: 20px auto;
  .slick-slide {
    width: 100%;
    margin-right: 8px;
    margin-left: 8px;
  }
  .slick-list {
    width: 100%;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const StReviewWrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 30px auto;
`;

const StReviewCard = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 450px;
  height: 136px;
  border: 1px solid ${(props) => props.theme.color.white};
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  & figure {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  & section {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  & h3 {
    font-size: 17px;
    font-weight: 500;
  }
  & p {
    font-size: 15px;
    font-weight: 300;
  }
`;
