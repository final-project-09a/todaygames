import BoardRegister from 'components/board/BoardRegister';
import { WrappingInput, TitleInput, MainBackground, ContentInput } from './styles';
import { ChangeEvent, useState } from 'react';

const Register = () => {
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
      <WrappingInput
        onSubmit={() => {
          titleTextHandler;
        }}
      >
        <TitleInput placeholder="제목을 입력하세요" value={title} onChange={titleTextHandler} />
        <ContentInput placeholder="내용을 입력하세요" value={content} onChange={contentTextHandler} />
      </WrappingInput>
    </MainBackground>
  );
};

export default Register;
