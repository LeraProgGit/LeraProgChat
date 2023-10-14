import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/register_page.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

function RegisterPage() {
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function submitRegistration(e) {
        e.preventDefault();
        client.post(
          '/api/register',
          {
            email: email,
            username: username,
            password: password
          }
        ).then(function(res) {
            localStorage.setItem('email', email);
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            client.post(
            '/api/login',
            {
              email: email,
              password: password
            }
          ).then(function(res) {
            localStorage.setItem('currentUser', true);
            navigate("/chats");
          });
        }).catch(function(error) {
          alert("Данные не прошли валидацию");
        });
      }
    
    return (
              <div className='RegisterPageMain'>
                <div className='RegisterPageMainDiv'>
                    <div className='RegisterPageWelcomeTextDiv'>
                        <h1 className='RegisterPageWelcomeText'>Еще немного и вы<br></br> станете частью<br></br> нашего сообщества!</h1>
                    </div>
                    <div className='RegisterPageLoginForm'>
                        <h4 className='RegisterPageEnterUserdata'>Введите свои данные</h4>
                        <div className='RegisterPageInputs'>
                          <Form onSubmit={e => submitRegistration(e)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Адрес электронной почты</Form.Label>
                              <Form.Control type="email" placeholder="Введите адрес электронной почты" value={email} onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                              <Form.Label>Никнейм</Form.Label>
                              <Form.Control type="text" placeholder="Введите никнейм" value={username} onChange={e => setUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>Пароль - минимум 8 символов</Form.Label>
                              <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                              Зарегистрироваться
                            </Button>
                          </Form>     
                        </div>
                    </div>
                </div>
            </div>
    )}

export default RegisterPage;