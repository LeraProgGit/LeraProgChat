import React, { useState, useEffect, useReducer, useRef } from "react";
import '../styles/chat.css'
import Message from "./Message";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ScrollToBottom from 'react-scroll-to-bottom';

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000'
  })

function Chat() {
    const [messages, setMessages] = useState([])
    const [content, setContent] = useState('')
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const flag = useRef(true);


    
    useEffect(() => {
        if ((localStorage.getItem('currentUser') === 'true') & (flag.current === true)) { {
          client.get('/api/messagelist')
          .then(function(res) {
            if (res.status === 200) {
              setMessages(res.data)
              console.log(messages)
              flag.current = false
              forceUpdate();
              return res.data
            } else {
              throw Error(`Something went wrong: code ${res.status}`)
            }
          })
          .catch(error => {
            console.log(error)
          })
      }}}, [flag.current])


      function updateFlag() {
        flag.current = true;
        forceUpdate();
      }
      function sendMessage(e) {
        e.preventDefault();
        client.post(
            '/api/message',
            {
                username: localStorage.getItem('username'),
                content: content
            }
        ).then(function(res) {
            flag.current = true;
            forceUpdate();
        })
        }


  return (
        <div className='ChatMain'>
                <div className='ChatMainDiv'>
                    <div className='ChatWindow'>
                        <h4 className='ChatEnterUserdata'>Общий чат</h4>
                        <ScrollToBottom className='ChatMessages'>
                            {messages.map((message, index) => (
                                  <Message key={index} username={message.username} content={message.content} />
                              ))}
                        </ScrollToBottom>

                        <div className="ChatInputs">
                            <Form onSubmit={e => sendMessage(e)}>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                  <Form.Control required={true} autoComplete="off" type="text" value={content} onChange={e => setContent(e.target.value)} />
                                </Form.Group>
                                <div className="ChatButtons">
                                  <Button className="sendButton" variant="info" onClick={updateFlag}>
                                    Обновить
                                  </Button>
                                  <Button className="sendButton" variant="primary" type="submit">
                                    Отправить
                                  </Button>
                                </div>
                                
                                
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
  );
}
export default Chat;