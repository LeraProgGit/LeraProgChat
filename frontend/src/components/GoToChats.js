import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/go_to_chats.css'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000'
  })

function GoToChats() {
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
            sessionStorage.setItem('email', user.email)
            sessionStorage.setItem('username', user.username)
          })
          .catch(error => {
            console.log(error)
          })
      }}}, [])
    return (
            <div className='GoToChatsMain'>
                <div className='GoToChatsMainDiv'>
                    <div className='GoToChatsWelcomeTextDiv'>
                        <h1 className='GoToChatsWelcomeText'>C возвращением!</h1>
                    </div>
                    <div className='GoToChatsLoginForm'>
                        <h4 className='GoToChatsEnterUserdata'>Введите свои данные</h4>
                        <div className='GoToChatsInputs'>
                            <Link className='GoToChatsLink' to='/chats'><button className='GoToChatsButton'><b>Перейти к чатам</b></button></Link>
                        </div>
                    </div>
                </div>
            </div>
                        

        
    )
}

export default GoToChats;