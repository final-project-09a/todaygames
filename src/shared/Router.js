import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Detail from '../pages/detail';
import { Board } from '../pages/board/Board';
import { BoardDetail } from '../pages/board/BoardDetail';
import { Register } from '../pages/board/Register';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/board" element={<Board />} />
        <Route path="/viewdetail" element={<BoardDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/detail:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
