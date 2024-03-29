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
  DetailTitle,
  DetailContent,
  WrappingTags,
  EachTag,
  CommentAndLike,
  RowCommentAndLike,
  WrappingComments,
  NumText
} from './style';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'query/keys';
import { UserInfo } from 'api/user';
import { getPosts } from 'api/post';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import CustomCarousel from 'common/CustomCarousel';
import styled from 'styled-components';
import { getFormattedDate } from 'util/date';
import comment from '../../assets/img/comment.png';
import Comment from 'components/comment/Comment';
import { createLike, deleteLike, fetchLike, matchLikes } from 'api/likes';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { getComments } from 'api/comments';

export const BoardDetail = () => {
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState(false);
  const [countingLike, setCountingLike] = useState(0);
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const { data: commentData } = useQuery({
    queryKey: [QUERY_KEYS.COMMENTS],
    queryFn: getComments
  });
  const { data: gameData } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });

  const { data: userInfoData } = useQuery({
    queryKey: [QUERY_KEYS.USERINFO],
    queryFn: UserInfo
  });

  const { data: postLikeData } = useQuery({
    queryKey: [QUERY_KEYS.LIKE],
    queryFn: fetchLike
  });
  const filteredComment = commentData?.filter((comment) => comment.id === id);
  const filterdPost = gameData?.find((game) => game.id === id);
  const filteredLike = postLikeData?.filter((like) => like.post_id === id);
  const filteredUser = userInfoData?.filter((user) => user.id === filterdPost?.user_id).find(() => true);
  const correctTime = filterdPost ? getFormattedDate(filterdPost.created_At) : undefined;

  //본인이 누른 좋아요가 계속 눌려있는지 확인
  useEffect(() => {
    const checkLiked = async () => {
      if (user?.id && id) {
        try {
          const likeData = await matchLikes(user.id, id);
          setIsLiked(!!likeData && likeData.length > 0);
        } catch (error) {
          console.error('북마크 여부 확인 에러: ', error);
        }
      }
    };
    checkLiked();
  }, [user?.id, id]);

  // 좋아요 눌렀을 때 추가, 삭제
  const mutation = useMutation<void, Error, { userId: string; appId: string }, Error>({
    mutationFn: async ({ userId, appId }) => {
      if (isLiked) {
        await deleteLike(userId, appId);
        setCountingLike((prevCount) => prevCount - 1);
      } else {
        await createLike(userId, appId);
        setCountingLike((prevCount) => prevCount + 1);
      }
    },
    onSuccess: () => {
      setIsLiked((prevValue) => !prevValue);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIKE] });
    },
    onError: (error: Error) => {
      console.error('북마크 에러: ', error);
    }
  });

  const handleLikeClick = async (userId: string, appId: string) => {
    if (user) {
      try {
        await mutation.mutateAsync({ userId, appId });
      } catch (error) {
        console.error('Error handling bookmark:', error);
      }
    }
  };

  const settings = {
    // row: 1,
    infinite: false,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    focusOnSelect: true,
    arrow: true
  };

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
                  <NickNameAndTitleText>
                    {filteredUser?.nickname ? filteredUser?.nickname : 'KAKAO'}
                  </NickNameAndTitleText>
                  <DateText>{correctTime}</DateText>
                </NickNameAndDate>
                <NickNameAndTitleText>{filterdPost?.game}</NickNameAndTitleText>
              </WrappingUserInfo>
            </WrappingImgText>
            <UserInfoAndBtn />
          </UserInfoAndBtn>
          <StCarouselWrapper>
            <CustomCarousel settings={settings}>
              {filterdPost?.image?.map((images, index) =>
                images ? (
                  <StImageWrapper key={index}>
                    <img src={images} />
                  </StImageWrapper>
                ) : (
                  <div key={index}></div>
                )
              )}
            </CustomCarousel>
          </StCarouselWrapper>
          <DetailTitle>{filterdPost?.title}</DetailTitle>
          <DetailContent>{filterdPost?.content}</DetailContent>
          <WrappingTags>
            <EachTag>{filterdPost?.category}</EachTag>
          </WrappingTags>
          <RowCommentAndLike>
            <CommentAndLike>
              <img src={comment} />
              <NumText>{filteredComment?.length}</NumText>
            </CommentAndLike>
            <CommentAndLike>
              <LikeIcon onClick={() => user?.id && handleLikeClick(user?.id, id!)} $isLiked={isLiked}>
                {isLiked ? <StLike /> : <StUnLike />}
              </LikeIcon>
              <NumText>{filteredLike?.length}</NumText>
            </CommentAndLike>
          </RowCommentAndLike>
          <WrappingComments>
            <Comment />
          </WrappingComments>
          {/* <Comment /> */}
        </WrappingBoardDetail>
      </AllContainer>
    </>
  );
};

const LikeIcon = styled.div<{ $isLiked: boolean }>`
  width: 37px;
  height: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    color: ${(props) => (props.$isLiked ? props.theme.color.white : props.theme.color.primary)};
  }
`;

const StCarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StImageWrapper = styled.figure`
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 600px;
  overflow: hidden;
  & img {
    padding: 0px 20px 0px 20px;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
  }
`;

const StUnLike = styled(BiLike)`
  font-size: 20px;
`;

const StLike = styled(BiSolidLike)`
  font-size: 20px;
`;
