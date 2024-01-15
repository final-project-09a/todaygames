import { Main } from 'components/board/Main';
import { useNavigate } from 'react-router-dom';
import { ToPostBtn } from './styles';

export const Board = () => {
  const navigate = useNavigate();
  return (
    <>
      <Main />
    </>
  );
};
