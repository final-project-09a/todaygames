import {
  WrappingInput,
  TitleInput,
  MainBackground,
  ContentInput,
  WrappingBtnAndInput,
  WrappingTitleAndBtn,
  WrappingBtns,
  TitleText,
  CancelBtn,
  RegisterBtn
} from './styles';
import { ChangeEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';

const Register = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['games'],
    queryFn: getGames
  });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const titleTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const contentTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  return (
    <MainBackground>
      <WrappingBtnAndInput>
        <WrappingTitleAndBtn>
          <TitleText>게시글 작성</TitleText>
          <WrappingBtns>
            <CancelBtn>취소</CancelBtn>
            <RegisterBtn>등록</RegisterBtn>
          </WrappingBtns>
        </WrappingTitleAndBtn>
        <WrappingInput
          onSubmit={() => {
            titleTextHandler;
          }}
        >
          <TitleInput placeholder="제목을 입력하세요" value={title} onChange={titleTextHandler} />
          <ContentInput placeholder="내용을 입력하세요" value={content} onChange={contentTextHandler} />
        </WrappingInput>
      </WrappingBtnAndInput>
    </MainBackground>
  );
};

export default Register;
