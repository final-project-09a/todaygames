import styled from 'styled-components';

const ModalContainer = styled.div`
  width: 100%;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: white;
`;

const DialogBox = styled.dialog`
  width: 100%;
  height: 600px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  top: 0px;
  right: 0px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  z-index: 10000;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
`;

export { ModalContainer, DialogBox, Backdrop };
