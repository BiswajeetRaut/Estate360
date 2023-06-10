import React, { useEffect, useRef, useState } from 'react';
import './chats.css';
import send from './send.png';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import db from '../../firebase';
import firebase from 'firebase';
const Messages = ({ selectedPerson, change, setchange }) => {

    const bottomRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const user = useSelector(selectUser);
    const s = selectedPerson?.id > user.id ? user.id + selectedPerson?.id : selectedPerson?.id + user.id;

    useEffect(() => {
        const chatRef = db.collection('Chats').doc(s);
        const unsubscribe = chatRef.onSnapshot((snapshot) => {
            if (snapshot.exists) {
                setMessages(snapshot.data()?.messages);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [selectedPerson]);
    useEffect(() => {
        if (bottomRef.current)
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessages = () => {
        const newMessage = {
            message,
            senderId: user.id,
            date: Date(Date.now()),
        };

        db.collection('Chats').doc(s).update({
            messages: [...messages, newMessage],
            date: firebase.firestore.FieldValue.serverTimestamp(),
        })
            .then(() => {console.log('message sent');
            setchange(!change);
        })
            .catch((error) => console.log(error));

        setMessage('');
    };

    return (
        <>
            <div className="chat-messages">
                {messages?.map((message, index) => {
                    const sender = message.senderId === user.id ? 'user' : 'receiver';
                    return (
                        <div ref={bottomRef} key={index} className={`messages-${sender}`}>
                            <div className={`message-${sender}`}>
                                <p>{message.message}</p>
                                <span>{message.date.toString().slice(4, 21)}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <form className="chat-bottom" onSubmit={(e)=>e.preventDefault()}>
                <div className="inp">
                <input
                    type="text"
                    placeholder="Type a message..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    />
                    </div>
                <button onClick={sendMessages}>
                    <img src={send} alt="" />
                </button>
            </form>
        </>
    );
};

export default Messages;
