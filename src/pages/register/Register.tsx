import {
  MainBackground,
  WrappingBtnAndInput,
  WrappingTitleAndBtn,
  WrappingBtns,
  TitleText,
  CancelBtn,
  RegisterBtn,
  WrappingAllComponents
} from './styles';
import { ChangeEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGameDetails } from 'api/games';
import { useNavigate, useParams } from 'react-router-dom';
import InputSet from 'components/register/InputSet';
import { ContentInput } from 'components/register/styles';

const Register = () => {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery({
    queryKey: ['games'],
    queryFn: getGameDetails
  });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const titleTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const contentTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const cancelBtnHandler = () => {
    navigate(`/board`);
  };
  return (
    <MainBackground>
      <WrappingBtnAndInput>
        <WrappingTitleAndBtn>
          <TitleText>게시글 작성</TitleText>
          <WrappingBtns>
            <CancelBtn onClick={cancelBtnHandler}>취소</CancelBtn>
            <RegisterBtn>등록</RegisterBtn>
          </WrappingBtns>
        </WrappingTitleAndBtn>
        <WrappingAllComponents>
          <InputSet />
          <ContentInput />
        </WrappingAllComponents>
      </WrappingBtnAndInput>
    </MainBackground>
  );
};

export default Register;
