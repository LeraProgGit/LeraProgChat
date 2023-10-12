import React from "react";
import '../styles/message.css'

function Message({ username, content}) { 
  return (
        <div className='MessageMain'>
            <div className="MessageUsernameDiv">
                <span className="MessageUsername"><b>{ username }</b></span>
            </div>
            <div className="MessageContent">
                { content }
            </div>
        </div>
  );
}
export default Message;