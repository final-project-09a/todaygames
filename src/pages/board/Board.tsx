import { Main } from 'components/board/Main';
import { useNavigate } from 'react-router-dom';

export const Board = () => {
  const navigate = useNavigate();
  return (
    <>
      <Main />
    </>
  );
};
