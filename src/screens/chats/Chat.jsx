import React from 'react'
import './chats.css'
import send from './send.png'
import userImg from './user.png'
const Chat = () => {
  const arr = [1, 1, 1, 1, 1, 1]
  return (
    <div className='chat-container'>
      <div className="chat-left">
        <div className="chart-search">
          <input type="text" placeholder='Search here ...' />
        </div>
        <div className="people-container">
          {
            arr.map((ele) => <div className="people">
              <div className="display">
                <img src={userImg} alt="" />
                <span>Name idh</span>
              </div>
            </div>)
          }
        </div>
      </div>
      <div className="chat-right">
        <div className="chat-top">
          <div className="display">
            <img src={userImg} alt="" />
            <span>Name idh</span>
          </div>
        </div>
        <div className="chat-messages">

        </div>
        <div className="chat-bottom">
          <input type="text" placeholder='Type a message...' />
          <button>
            <img src={send} alt="" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
