import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Detail from '../pages/detail';
import { Board } from '../pages/board/Board';
import { BoardDetail } from '../pages/board/BoardDetail';
import Register from '../pages/register/Register';
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
        <Route path="/board" element={<Board />} />
        <Route path="/boarddetail:id" element={<BoardDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/detail/:appid" element={<Detail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage/:id" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
