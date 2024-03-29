import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Detail from '../pages/detail';
import { Board } from '../pages/board/Board';
import { BoardDetail } from '../pages/boardDetail/BoardDetail';
import Register from '../pages/register/Register';
import SignUp from '../pages/signup/signup';
import Login from '../pages/login/Login';
import NavBar from 'components/Navbar/NavBar';
import Mypage from '../pages/mypage/mypage';
import Search from 'pages/search/Search';
import SearchUserInfo from 'pages/searchUserInfo';
import Footer from 'components/Footer';

const Router = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/edit/:postid" element={<Register />} />
        <Route path="/boarddetail/:id" element={<BoardDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/search/:searchText" element={<Search />} />
        <Route path="/detail/:appid" element={<Detail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search/userinfo" element={<SearchUserInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
