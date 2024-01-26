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
  TagText,
  RemoveImgBtn,
  WrappingCardAndBtn
} from './styles';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from 'types/supabase';
import { getGames } from 'api/games';
import { QUERY_KEYS } from 'query/keys';
import Modal from 'components/register/Modal';
import { insertPost } from 'api/supabaseData';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import AlertModal from 'components/register/AlertModal';

const Register = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { post } = location.state || {};



  const [title, setTitle] = useState('');
  const [contentText, setContentText] = useState('');
  const [gameName, setGameName] = useState('');
  const [tagText, setTagText] = useState('');
  const [searchedGame, setSearchedGame] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isAlertModalOpen, setisAlertModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const currentTimestamp = new Date().getTime();

  useEffect(() => {
    setTitle(post?.title || '');
    setContentText(post?.content || '');
    setGameName(post?.game || '');
    setTagText(post?.category || '');
  });

  const isEditing = !!post;

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

  const handleImageDelete = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
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
      setisAlertModalOpen(true);
      setModalContent('검색어가 입력되지 않았습니다');
    }
  }, [isModalOpen, gameName]);

  useEffect(() => {
    if (gameName.length < 1) {
      setTagText('');
    }
  }, [gameName]);

  const { mutate } = useMutation({
    mutationFn: insertPost,
    onError: (error) => {
      alert('에러가 발생했습니다.');
    }
  });


  const handelRegisterButton = async () => {

  // 이미지를 Supabase 스토리지에 업로드하는 함수
  const postImagesToStorage = async () => {
    const uploadedImageUrls = [];
    try {
      for (const file of imageFiles) {
        // 공백 제거 및 특수 문자 대체, 한글도 포함하여 처리
        const safeUserName = user?.nickname;
        // 파일 이름을 안전한 형태로 변환
        const safeFileName = file.name;
        const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        if (regex.test(safeFileName)) {
          throw new Error('파일 이름에는 한글을 사용할 수 없습니다.');
        }
        const filePath = `${safeUserName}/${safeFileName}/${currentTimestamp}`;

        const { error, data } = await supabase.storage.from('postImage').upload(filePath, file);
        if (error) throw error;
        const { data: publicURL } = await supabase.storage.from('postImage').getPublicUrl(filePath);
        uploadedImageUrls.push(publicURL.publicUrl);
        console.log(uploadedImageUrls);
        console.log(imageFiles);
      }
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
    return uploadedImageUrls;
  };

  const registerPost = async () => {

    if (user?.id) {
      if (!title || !gameName || !tagText || !contentText) {
        setModalContent('제목, 게임 이름, 내용은 필수 입력사항입니다!');
        setisAlertModalOpen(true);
        return;
      }
      const uploadedImageUrls = await postImagesToStorage();
      console.log(uploadedImageUrls);
      if (!Array.isArray(uploadedImageUrls)) {
        return uploadedImageUrls;
      }

      mutate({
        title: title,
        game: gameName,
        category: tagText,
        image: uploadedImageUrls,
        content: contentText,
        user_id: user.id
      });
      setModalContent('등록이 완료되었습니다!');
      setisAlertModalOpen(true);
      setTimeout(() => {
        navigate('/board');
      }, 3000);
    } else {
      return null;
    }
  };

  const handleEditButton = () => {
    alert('수정기능 구현중...');
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setisAlertModalOpen(false);
    }, 3000);

    // Clean up
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isAlertModalOpen]);

  const cancelBtnHandler = () => {
    navigate(`/board`);
  };

  return (
    <MainBackground>
      <WrappingBtnAndInput>
        <WrappingTitleAndBtn>
          <TitleText>{isEditing ? '게시글 수정' : '게시글 작성'}</TitleText>
          <WrappingBtns>
            <CancelBtn onClick={cancelBtnHandler}>취소</CancelBtn>
            <RegisterBtn onClick={isEditing ? handleEditButton : handelRegisterButton}>
              {isEditing ? '수정' : '등록'}
            </RegisterBtn>
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
            <WrappingCardAndBtn key={index}>
              <RemoveImgBtn
                onClick={() => {
                  handleImageDelete(index);
                }}
              />
              <ImageBox key={index} src={url} alt={`업로드된 이미지 ${index + 1}`} />
            </WrappingCardAndBtn>
          ))}
        </WrappingImages>
      </WrappingBtnAndInput>
      {isAlertModalOpen && (
        <AlertModal isOpen={isAlertModalOpen}>
          <p>{modalContent}</p>
        </AlertModal>
      )}
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
