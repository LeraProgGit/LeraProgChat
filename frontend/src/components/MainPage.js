import axios from 'axios'
import React from 'react'
import '../styles/main_page.css'
import { Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000'
  })
function MainPage() {

    useEffect(() => {
        client.get('api/user')
        .then(function(res) {
            localStorage.setItem('currentUser', true);
        })
        .catch(function(error) {
            localStorage.setItem('currentUser', false);
        });
      }, []);
    const logined = localStorage.getItem('currentUser');

    if (logined === 'true') {
        return (
            <Navigate to="/chats" />
        )
    }
    return (
        <div className='MainPageMain'>
            <div className='MainPageMainDiv'>
                <div className='MainPageWelcomeTextDiv'>
                    <h1 className='MainPageWelcomeText'>Добро пожаловать<br></br>в<br></br>CHATY!</h1>
                </div>
                <div className='MainPageLoginForm'>
                    <h4 className='MainPageEnterUserdata'>Вы у нас впервые?</h4>
                    <div className='MainPageLoginButtons'>
                        <Link className='MainPageLink' to='/login'><button className='MainPageButtons'><b>Авторизоваться</b></button></Link>
                        <Link className='MainPageLink' to='/signup'><button className='MainPageButtonsSignUp'><b>Зарегистрироваться</b></button></Link>
                    </div>
                </div>
            </div>
            
        </div>
    )}

export default MainPage;