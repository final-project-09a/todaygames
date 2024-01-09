import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Detail from '../pages/detail';
import { BoardPg } from '../pages/board/BoardPg';
import { ViewDetail } from '../pages/board/ViewDetail';
import { Register } from '../pages/board/Register';
import SignUp from '../pages/signup/signup';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/board" element={<BoardPg />} />
        <Route path="/viewdetail" element={<ViewDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/detail:id" element={<Detail />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
