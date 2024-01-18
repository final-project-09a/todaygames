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
  GameSelect,
  ImageBox,
  WrappingImages,
  SearchBtn
} from './styles';
import { ChangeEvent, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGameDetails } from 'api/steamApis';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from 'shared/supabase';
import { GENRE_NAME } from '../../constants/genre';
import searchIcon from '../../assets/img/searchIcon.png';
import Modal from 'components/register/Modal';
import { getGames } from 'api/games';
import { QUERY_KEYS } from 'query/keys';

const Register = () => {
  const genres = GENRE_NAME;
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [contentText, setContentText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [game, setGame] = useState(''); //추후에 검색기능 후 삭제예정
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const titleTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };
  const contentTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentText(e.target.value);
  };

  // const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setImageFiles(event.target.files[0]);
  //   }
  // };

  const handleImageUploadClick = () => {
    imageInputRef.current?.click();
  };

  // const saveImage = async () => {
  //   // 이미지 파일이 선택된 경우
  //   if (imageFiles) {
  //     const filePath = `${selectedGenre}/${imageFiles}`;
  //     // const { error: uploadError } = await supabase.storage.from('postImage').upload(imageUrl);

  //     if (uploadError) {
  //       throw uploadError;
  //     }

  //     const { data: imageUrlData } = supabase.storage.from('postImage').getPublicUrl(filePath);

  //     const { data, error } = await supabase.from('posts').insert([
  //       {
  //         category: selectedGenre,
  //         title: title,
  //         content: contentText,
  //         image: imageUrls,
  //         comments_count: 5,
  //         like_count: 8
  //       }
  //     ]);

  //     if (error) throw error;

  //     console.log(error, '에러');
  //     console.log('Data saved: ', data);
  //     console.log(selectedGenre);
  //   }
  // };

  const handleImageUploading = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setImageFiles(files);
      setImageUrls(files.map((file) => URL.createObjectURL(file)));
    }
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: [QUERY_KEYS.GAMES],
    queryFn: getGames,
    enabled: isModalOpen
  });
  const gamesearchHandle = async () => {
    setIsModalOpen(true);
    try {
      const games = await getGames(); // 게임을 가져옵니다.
      console.log(games); // 결과를 확인하기 위해 콘솔에 출력합니다.
    } catch (error) {
      console.error('게임을 가져오는 데 실패했습니다.', error);
      setIsModalOpen(false); // 에러가 발생하면 모달을 닫습니다.
    }
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
          <WrappingInput>
            <Titles>
              <TextSpace>제목</TextSpace>
              <TitleInput value={title} onChange={titleTextHandler} />
            </Titles>
            <Titles>
              <TextSpace>게임</TextSpace>
              <GameSelect />
              <SearchBtn onClick={gamesearchHandle} />
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {data?.map((game) => {
                  return <p key={game.id}>{game.name}</p>;
                })}
              </Modal>
            </Titles>
            <Titles>
              <TextSpace>태그</TextSpace>
              <TagSelect></TagSelect>
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
              onChange={handleImageUploading}
              multiple
            />
          </BottomBtn>
        </WrappingAllComponents>
        <WrappingImages>
          {imageUrls.map((url, index) => (
            <ImageBox key={index} src={url} alt={`업로드된 이미지 ${index + 1}`} />
          ))}
        </WrappingImages>
      </WrappingBtnAndInput>
    </MainBackground>
  );
};

export default Register;
