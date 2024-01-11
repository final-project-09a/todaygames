import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Detail from '../pages/detail';
import { BoardPg } from '../pages/board/BoardPg';
import { ViewDetail } from '../pages/board/ViewDetail';
import { Register } from '../pages/board/Register';
import SignUp from '../pages/signup/signup';
import Login from '../pages/login/Login';
import NavBar from 'components/Navbar/NavBar';
import Mypage from '../pages/mypage/mypage';

const Router = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/board" element={<BoardPg />} />
        <Route path="/viewdetail" element={<ViewDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/detail:id" element={<Detail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
