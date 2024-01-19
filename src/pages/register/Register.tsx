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
  GameSelect,
  ImageBox,
  WrappingImages,
  SearchBtn,
  GameCard,
  CardImage,
  TagArea,
  TagText
} from './styles';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from 'shared/supabase';
import { GENRE_NAME } from '../../constants/genre';
import searchIcon from '../../assets/img/searchIcon.png';
import { getGames } from 'api/games';
import { QUERY_KEYS } from 'query/keys';
import Modal from 'components/register/Modal';
import { insertPost } from 'api/supabaseData';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';

const Register = () => {
  const genres = GENRE_NAME;
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [contentText, setContentText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [gameName, setGameName] = useState('');
  const [tagText, setTagText] = useState('');
  const [searchedGame, setSearchedGame] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const titleTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const contentTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentText(e.target.value);
  };

  const handleImageUploadClick = () => {
    imageInputRef.current?.click();
  };

  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const handleImageUploading = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setImageFiles(files);
      setImageUrls(files.map((file) => URL.createObjectURL(file)));
    }
  };

  const searchOnClickHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setGameName(e.target.value);
  };

  const {
    isLoading,
    isError,
    data: allGames
  } = useQuery({
    queryKey: [QUERY_KEYS.GAMES],
    queryFn: getGames,
    enabled: isModalOpen
  });

  const searchedGames = allGames?.filter((game) => game.name.toLowerCase().includes(gameName.toLowerCase()));

  const onClickToggleModal = useCallback(() => {
    if (gameName) {
      setIsModalOpen(!isModalOpen);
      setSearchedGame(gameName);
    } else if (gameName.length < 1) {
      alert('게임 이름이 입력되지 않았습니다.');
    }
  }, [isModalOpen, gameName]);

  useEffect(() => {
    if (gameName.length < 1) {
      setTagText('');
    }
  }, [gameName]);

  const { mutate } = useMutation({
    mutationFn: insertPost,
    onSuccess: () => {
      navigate('/board');
    },
    onError: (error) => {
      alert('에러가 발생했습니다.');
    }
  });

  const registerPost = () => {
    mutate({
      title: title,
      game: gameName,
      category: tagText,
      image: imageUrls,
      content: contentText,
      id: user?.id
    });
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
            <RegisterBtn onClick={registerPost}>등록</RegisterBtn>
          </WrappingBtns>
        </WrappingTitleAndBtn>
        <WrappingAllComponents>
          <WrappingInput
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Titles>
              <TextSpace>제목</TextSpace>
              <TitleInput value={title} onChange={titleTextHandler} />
            </Titles>
            <Titles>
              <TextSpace>게임</TextSpace>
              <GameSelect value={gameName} onChange={searchOnClickHandler} />
              <SearchBtn onClick={onClickToggleModal} />
            </Titles>
            <Titles>
              <TextSpace>태그</TextSpace>
              <TagArea>
                {gameName ? (
                  <TagText isVisible={true}>{tagText}</TagText>
                ) : (
                  <TagText isVisible={false}>{tagText}</TagText>
                )}
              </TagArea>
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
      {isModalOpen && (
        <Modal onClickToggleModal={onClickToggleModal}>
          {searchedGames?.map((games) => {
            return (
              <>
                <GameCard
                  onClick={() => {
                    setGameName(games.name);
                    setTagText(games.genres);
                    setIsModalOpen(false);
                  }}
                  key={games.id}
                >
                  <CardImage src={games.header_image}></CardImage>
                  <div style={{ fontSize: '15px' }}>{games.name}</div>
                </GameCard>
              </>
            );
          })}
        </Modal>
      )}
    </MainBackground>
  );
};

export default Register;
