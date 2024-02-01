import styled from 'styled-components';
import editBtn from '../../assets/img/editBtn.png';

const AllContainer = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const WrappingBoardDetail = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.color.postback};
  width: 1281px;
  height: fit-content;
`;

const UserInfoAndBtn = styled.div`
  width: 1281px;
  height: 85px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const EditBtn = styled.button`
  margin: 25px 20px 0px 0px;
  width: 24px;
  height: 24px;
  background-color: transparent;
  background-image: url(${editBtn});
  cursor: pointer;
`;

const WrappingImgText = styled.div`
  margin: 20px 0px 0px 21px;
  gap: 14px;
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
`;

const WrappingUserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileImage = styled.img`
  width: 45px;
  height: 45px;
  flex-shrink: 0;
  border-radius: 50px;
  background-color: aqua;
  border: 0px;
`;

const NickNameAndDate = styled.div`
  width: 250px;
  height: 22.5px;
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const NickNameAndTitleText = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 22.5px;
  color: #fff;
  align-items: center;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  font-weight: 400;
`;

const DateText = styled.div`
  align-items: center;
  display: flex;
  width: fit-content;
  height: 22.5px;
  color: #999;
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-weight: 400;
  text-align: center;
`;

const DetailImage = styled.img`
  width: 1240px;
  height: 500px;
  border: 0px;
  border-radius: 10px;
  background-color: #646467;
  margin: 0px 20px 0px 20px;
`;

const DetailTitle = styled.div`
  width: fit-content;
  height: fit-content;
  color: #fff;
  font-family: 'Pretendard-Regular';
  font-size: 18px;
  font-weight: 700;
  margin: 30px 0px 9px 20px;
`;

const DetailContent = styled.div`
  color: #eee;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  margin-left: 20px;
`;

const WrappingTags = styled.div`
  width: fit-content;
  height: fit-content;
  display: grid;
  grid-template-columns: 2 1rf;
  margin: 20px 0px 0px 20px;
`;

const EachTag = styled.div`
  color: #fff;
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-weight: 400;
  width: auto;
  height: auto;
  display: inline-flex;
  padding: 7px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: #363636;
`;

const WrappingComments = styled.div`
  width: 1281px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.color.gray};
`;

const RowCommentAndLike = styled.div`
  margin: 30px 0px 20px 22px;
  gap: 12px;
  display: flex;
  flex-direction: row;
`;

const CommentAndLike = styled.div`
  width: 37px;
  height: 24px;
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const CommentsNum = styled.div`
  display: flex;
  flex-direction: row;
  width: 37px;
  height: 24px;
  object-fit: cover;
`;

const NumText = styled.div`
  display: flex;
  margin-top: 3px;
  width: 9px;
  height: 14px;
`;

const LikeNum = styled.div`
  display: flex;
  flex-direction: row;
  width: 43px;
  height: 24px;
  object-fit: cover;
`;

export {
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
  EachTag,
  CommentAndLike,
  CommentsNum,
  LikeNum,
  RowCommentAndLike,
  WrappingComments,
  NumText
};
