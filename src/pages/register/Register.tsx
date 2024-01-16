import {
  MainBackground,
  WrappingBtnAndInput,
  WrappingTitleAndBtn,
  WrappingBtns,
  TitleText,
  CancelBtn,
  RegisterBtn,
  WrappingAllComponents,
  ContentInput
} from './styles';
import { ChangeEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGameDetails } from 'api/steamApis';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from 'shared/supabase';

const Register = () => {
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const [contentText, setContentText] = useState('');
  const contentTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentText(e.target.value);
  };

  const saveToDatabase = async () => {
    const { data, error } = await supabase.from('YOUR_TABLE_NAME').insert([{ content: contentText }]);

    if (error) throw error;

    console.log('Data saved: ', data);
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ['games'],
    queryFn: getGameDetails
  });

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
            <RegisterBtn onClick={saveToDatabase}>등록</RegisterBtn>
          </WrappingBtns>
        </WrappingTitleAndBtn>
        <WrappingAllComponents>
          <ContentInput value={contentText} onChange={contentTextHandler} />
        </WrappingAllComponents>
      </WrappingBtnAndInput>
    </MainBackground>
  );
};

export default Register;
