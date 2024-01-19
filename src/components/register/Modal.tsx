import React, { PropsWithChildren } from 'react';
import { ModalContainer, DialogBox, Backdrop } from './style';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) {
  return (
    <ModalContainer>
      <div>
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
