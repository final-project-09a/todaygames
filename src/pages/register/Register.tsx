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
  RegisterBtn,
  Titles
} from './styles';
import { ChangeEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGameDetails } from 'api/games';
import { useNavigate } from 'react-router-dom';

const Register = () => {
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
        <WrappingInput
          onSubmit={() => {
            titleTextHandler;
          }}
        >
          <Titles>
            제목
            <TitleInput placeholder="제목을 입력하세요" value={title} onChange={titleTextHandler} />
          </Titles>
          <div>
            <ContentInput placeholder="내용을 입력하세요" value={content} onChange={contentTextHandler} />
          </div>
        </WrappingInput>
      </WrappingBtnAndInput>
    </MainBackground>
  );
};

export default Register;
