import './App.css';
import axios from 'axios'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ChatsPage from './components/ChatsPage';
import GoToChats from './components/GoToChats';



axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/chats" element={<ChatsPage />} />
        <Route path='/goToChats' element={<GoToChats />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
