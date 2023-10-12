import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from './LogoutButton';
import { Navigate } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Chat from "./Chat";
import '../styles/chats_page.css'


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

function ChatsPage() {
    const [ username, setUsername] = useState('')
    const [ error, setError] = useState()
    const logined = localStorage.getItem('currentUser')
    
    useEffect(() => {
        if (localStorage.getItem('currentUser') === 'true') { {
        client.get('/api/user')
        .then(function(res) {
          if (res.status === 200) {
            console.log(res.data)
            return res.data
          } else {
            throw Error(`Something went wrong: code ${res.status}`)
          }
        })
        .then(({user}) => {
          setUsername(user.username)
          localStorage.setItem('username', user.username)
        })
        .catch(error => {
          console.log(error)
          setError('Проверьте на 127.0.0.1:3000, сессионная аутентификация не работает на localhost')
        })
    }}}, [])


    if (logined === 'true') {
        return (
          <div className="App">
            {error?
                <div className="Profile">
                <Navbar bg="primary" data-bs-theme="dark">
                  <Container>
                    <Navbar.Brand href="/"><b>CHATY</b></Navbar.Brand>
                    <LogoutButton />
                  </Container>
                </Navbar>
                <p>{error}</p>
              </div>
              
            :
              <div className="Profile">
                <Navbar bg="primary" data-bs-theme="dark">
                  <Container>
                    <Navbar.Brand href="/"><b>CHATY</b></Navbar.Brand>
                    <span className='username'><b>{username}</b></span>
                    <LogoutButton />
                  </Container>
                </Navbar>
                <Chat />
              </div>
            }
          </div>
        );
    }
    return (
        <Navigate to="/login" />
      );
}

export default ChatsPage;