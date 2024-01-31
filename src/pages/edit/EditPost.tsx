import React, { useState } from 'react';

import Modal from 'components/register/Modal';
import AlertModal from 'components/register/AlertModal';
import { getPosts } from 'api/post';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'query/keys';

const EditPost = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });

  const handleEditPost = () => {
    alert('수정');
  };

  const handelCancelEditPost = () => {
    alert('취소');
  };

  //   const onClickToggleModal = useCallback(() => {
  //     if (gameName) {
  //       setIsModalOpen(!isModalOpen);
  //       setSearchedGame(gameName);
  //     } else if (gameName.length < 1) {
  //       setisAlertModalOpen(true);
  //       setModalContent('검색어가 입력되지 않았습니다');
  //     }
  //   }, [isModalOpen, gameName]);

  return (
    <></>
    // <MainBackground>
    //   <WrappingBtnAndInput>
    //     <WrappingTitleAndBtn>
    //       <TitleText>게시글 작성</TitleText>
    //       <WrappingBtns>
    //         <CancelBtn onClick={handelCancelEditPost}>취소</CancelBtn>
    //         <RegisterBtn onClick={handleEditPost}>수정</RegisterBtn>
    //       </WrappingBtns>
    //     </WrappingTitleAndBtn>
    //     <WrappingAllComponents>
    //       <WrappingInput
    //         onSubmit={(e) => {
    //           e.preventDefault();
    //         }}
    //       >
    //         <Titles>
    //           <TextSpace>제목</TextSpace>
    //           <TitleInput value={title} onChange={titleTextHandler} />
    //         </Titles>
    //         <Titles>
    //           <TextSpace>게임</TextSpace>
    //           <GameSelect value={gameName} onChange={searchOnClickHandler} />
    //           <SearchBtn onClick={onClickToggleModal} />
    //         </Titles>
    //         <Titles>
    //           <TextSpace>태그</TextSpace>
    //           <TagArea>
    //             {gameName ? (
    //               <TagText isVisible={true}>{tagText}</TagText>
    //             ) : (
    //               <TagText isVisible={false}>{tagText}</TagText>
    //             )}
    //           </TagArea>
    //         </Titles>
    //       </WrappingInput>
    //       <ContentInput value={contentText} onChange={contentTextHandler} />
    //       <BottomBtn>
    //         <ImageUploadBtn onClick={handleImageUploadClick}>이미지 첨부하기</ImageUploadBtn>
    //         <input
    //           type="file"
    //           accept="image/*"
    //           ref={imageInputRef}
    //           style={{ display: 'none' }}
    //           onChange={handleImageUploading}
    //           multiple
    //         />
    //       </BottomBtn>
    //     </WrappingAllComponents>
    //     <WrappingImages>
    //       {imageUrls.map((url, index) => (
    //         <WrappingCardAndBtn key={index}>
    //           <RemoveImgBtn
    //             onClick={() => {
    //               handleImageDelete(index);
    //               console.log(imageUrls);
    //             }}
    //           />
    //           <ImageBox key={index} src={url} alt={`업로드된 이미지 ${index + 1}`} />
    //         </WrappingCardAndBtn>
    //       ))}
    //     </WrappingImages>
    //   </WrappingBtnAndInput>
    //   {isAlertModalOpen && (
    //     <AlertModal isOpen={isAlertModalOpen}>
    //       <p>{modalContent}</p>
    //     </AlertModal>
    //   )}
    //   {isModalOpen && (
    //     <Modal onClickToggleModal={onClickToggleModal}>
    //       {searchedGames?.map((games) => {
    //         return (
    //           <>
    //             <GameCard
    //               onClick={() => {
    //                 setGameName(games.name);
    //                 setTagText(games.genres);
    //                 setIsModalOpen(false);
    //               }}
    //               key={games.id}
    //             >
    //               <CardImage src={games.header_image}></CardImage>

    //               <div style={{ fontSize: '15px' }}>{games.name}</div>
    //             </GameCard>
    //           </>
    //         );
    //       })}
    //     </Modal>
    //   )}
    // </MainBackground>
  );
};

export default EditPost;
