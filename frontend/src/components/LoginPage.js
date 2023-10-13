import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/login_page.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


const client = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function submitLogin(e) {
      e.preventDefault();
      client.post(
        '/api/login',
        {
          email: email,
          password: password
        }
      ).then(function(res) {
        return res.data;
      }).then(function(data) {
        localStorage.setItem('currentUser', true)
        navigate("/goToChats");
      }).catch(function(error) {
        alert("Что-то не так в введенных данных либо такого пользователя не существует");
      });
    }

    return (
              <div className='LoginPageMain'>
                <div className='LoginPageMainDiv'>
                    <div className='LoginPageWelcomeTextDiv'>
                        <h1 className='LoginPageWelcomeText'>C возвращением!</h1>
                    </div>
                    <div className='LoginPageLoginForm'>
                        <h4 className='LoginPageEnterUserdata'>Введите свои данные</h4>
                        <div className='LoginPageInputs'>
                          <Form onSubmit={e => submitLogin(e)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Адрес электронной почты</Form.Label>
                              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>Пароль - минимум 8 символов</Form.Label>
                              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                              Войти
                            </Button>
                          </Form>
                        </div>
                    </div>
                </div>
            </div>
    )}

export default LoginPage;