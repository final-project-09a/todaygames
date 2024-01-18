import React, { PropsWithChildren } from 'react';
import { ModalContainer, DialogBox, Backdrop } from './style';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) {
  return (
    <ModalContainer>
      <div>
        <h1>게임을 선택해주세요.</h1>
        <DialogBox>{children}</DialogBox>
        <Backdrop
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();

            if (onClickToggleModal) {
              onClickToggleModal();
            }
          }}
        />
      </div>
    </ModalContainer>
  );
}

export default Modal;
