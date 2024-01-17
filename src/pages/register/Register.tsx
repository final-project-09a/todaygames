import {
  MainBackground,
  WrappingBtnAndInput,
  WrappingTitleAndBtn,
  WrappingBtns,
  TitleText,
  CancelBtn,
  RegisterBtn,
  WrappingAllComponents,
  ContentInput,
  Titles,
  WrappingInput,
  TitleInput,
  TextSpace,
  ImageUploadBtn,
  BottomBtn,
  TagSelect,
  GameSelect
} from './styles';
import { ChangeEvent, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGameDetails } from 'api/steamApis';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from 'shared/supabase';
import { GENRE_NAME } from '../../constants/genre';

const Register = () => {
  const genres = GENRE_NAME;
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [contentText, setContentText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [game, setGame] = useState(''); //추후에 검색기능 후 삭제예정
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const titleTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };
  const contentTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentText(e.target.value);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleImageUploadClick = () => {
    imageInputRef.current?.click();
  };

  const saveImage = async () => {
    // 이미지 파일이 선택된 경우
    if (imageFile) {
      const filePath = `${selectedGenre}/${imageFile.name}`;
      const { error: uploadError } = await supabase.storage.from('postImage').upload(filePath, imageFile);

      if (uploadError) {
        throw uploadError;
      }

      const imageUrl = supabase.storage.from('postImage').getPublicUrl(filePath);

      const { data, error } = await supabase.from('posts').insert([
        {
          category: selectedGenre,
          title: title,
          content: contentText,
          image: imageUrl,
          comments_count: 5,
          like_count: 8
        }
      ]);

      if (error) throw error;

      console.log(error, '에러');
      console.log('Data saved: ', data);
      console.log(selectedGenre);
    }
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
            <RegisterBtn onClick={saveImage}>등록</RegisterBtn>
          </WrappingBtns>
        </WrappingTitleAndBtn>
        <WrappingAllComponents>
          <WrappingInput>
            <Titles>
              <TextSpace>제목</TextSpace>
              <TitleInput value={title} onChange={titleTextHandler} />
            </Titles>
            <Titles>
              <TextSpace>게임</TextSpace>
              <GameSelect />
            </Titles>
            <Titles>
              <TextSpace>태그</TextSpace>
              <TagSelect value={selectedGenre} onChange={(event) => setSelectedGenre(event.target.value)}>
                {genres.map((genre) => {
                  return (
                    <option key={genre.tag} value={genre.tag}>
                      {genre.tag}
                    </option>
                  );
                })}
              </TagSelect>
            </Titles>
          </WrappingInput>
          <ContentInput value={contentText} onChange={contentTextHandler} />
          <BottomBtn>
            <ImageUploadBtn onClick={handleImageUploadClick}>이미지 첨부하기</ImageUploadBtn>
            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </BottomBtn>
        </WrappingAllComponents>
      </WrappingBtnAndInput>
    </MainBackground>
  );
};

export default Register;
