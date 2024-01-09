import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Detail from '../pages/detail';
import Comm from '../pages/comm/Comm';
import SignUp from '../pages/signup/signup';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/comm" element={<Comm />} />
        <Route path="/" element={<Home />} />
        <Route path="/detail:id" element={<Detail />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
