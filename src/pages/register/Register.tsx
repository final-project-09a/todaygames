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
import { getPosts, updatedataPosts } from 'api/post';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Register 페이지 들어올 때 받아온 게시물 데이터
  const { post } = location.state || {};

  const [title, setTitle] = useState('');
  const [contentText, setContentText] = useState('');
  const [gameName, setGameName] = useState('');
  const [tagText, setTagText] = useState('');
  const [searchedGame, setSearchedGame] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isAlertModalOpen, setisAlertModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [updatePosts, setUpdatePosts] = useState(false);

  useEffect(() => {
    setTitle(post?.title || '');
    setContentText(post?.content || '');
    setGameName(post?.game || '');
    setTagText(post?.category || '');
  }, []);

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

  // 이미지를 Supabase 스토리지에 업로드하는 함수
  const uploadImagesToSupabase = async () => {
    const uploadedImageUrls: string[] = [];
    try {
      for (const file of imageFiles) {
        // 공백 제거 및 특수 문자 대체
        const safeUserName = user?.nickname?.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '_');
        // 파일 이름을 안전한 형태로 변환
        const safeFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const filePath = `${safeUserName}/${safeFileName}`;

        const { error, data } = await supabase.storage.from('postImage').upload(filePath, file);
        if (error) throw error;
        const { data: publicURL } = supabase.storage.from('postImage').getPublicUrl(filePath);
        uploadedImageUrls.push(publicURL.publicUrl);
      }
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
    return uploadedImageUrls;
  };

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

  const tagOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTagText(e.target.value);
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

  const { mutate } = useMutation({
    mutationFn: insertPost,
    onError: (error) => {
      alert('에러가 발생했습니다.');
    }
  });

  const handelRegisterButton = async () => {
    if (user?.id) {
      if (!title || !gameName || !tagText || !contentText) {
        setModalContent('제목, 게임 이름, 내용은 필수 입력사항입니다!');
        setisAlertModalOpen(true);
        return;
      }
      const uploadedImageUrls = await uploadImagesToSupabase();

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
  // 수정
  const handleEditButton = async (postId: string) => {
    try {
      await updatedataPosts(postId, title, gameName, tagText, contentText, imageUrls);
      setisAlertModalOpen(true);
      if (!title || !gameName || !tagText || !contentText) {
        setModalContent('수정이 완료되었습니다.');
        setTimeout(() => {
          navigate('/board');
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
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

  console.log(tagText);

  return (
    <MainBackground>
      <WrappingBtnAndInput>
        <WrappingTitleAndBtn>
          <TitleText>{isEditing ? '게시글 수정' : '게시글 작성'}</TitleText>
          <WrappingBtns>
            <CancelBtn onClick={cancelBtnHandler}>취소</CancelBtn>
            <RegisterBtn onClick={isEditing ? () => handleEditButton(post.id) : handelRegisterButton}>
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
              <TitleInput value={title} onChange={titleTextHandler} placeholder="제목을 입력해 주세요." />
            </Titles>
            <Titles>
              <TextSpace>게임</TextSpace>
              <TitleInput
                value={gameName}
                onChange={searchOnClickHandler}
                placeholder="게시하고 싶은 게임을 검색해 주세요."
              />
              <SearchBtn onClick={onClickToggleModal} />
            </Titles>
            <Titles>
              <TextSpace>태그</TextSpace>
              <TagArea>{gameName && <TagText isVisible={true}>{tagText}</TagText>}</TagArea>
            </Titles>
          </WrappingInput>
          <ContentInput value={contentText} onChange={contentTextHandler} placeholder="게시글을 입력해 주세요." />
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
                  console.log(imageUrls);
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
