import React, { useEffect, useState } from 'react'
import './chats.css'
import userImg from './user.png'
import Messages from './Messages'
import db from '../../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'
import { useParams } from 'react-router-dom'
import firebase from 'firebase'
import Header from '../../components/Header'
import Chatsidebar from './Chatsidebar'
const Chat = () => {
  const [people, setPeople] = useState([]);
  const [change,setchange] = useState(false);
  const [roomId, setRoomId] = React.useState('');
  const [selectedPerson, setSelectedPerson] = useState();
  const [message, setMessage] = React.useState([]);
  const user = useSelector(selectUser);
  var { receiverId } = useParams()
  receiverId = receiverId ? receiverId : '0';
  var name = "";
  db.collection('Users').doc(receiverId).get().then((doc) => { if (doc.exists) name = doc.data().name })
  const s = receiverId > user.id ? user.id + receiverId : receiverId + user.id
  const newPeople = () => {
    db.collection('Chats').doc(s).get().then((snapshot) => {
      console.log(snapshot.exists)
      if (!snapshot.exists) {
        db.collection('Chats').doc(s).set({
          messages: [],
          sender: {
            name: user.name,
            id: user.id,
          },
          receiver: {
            name: name,
            id: receiverId,
          },
          date:firebase.firestore.FieldValue.serverTimestamp(),
        })
        getPeople();
      }
      setSelectedPerson({
        name: name,
        id: receiverId,
        date: Date.now()
      })
    })
  }
  const getPeople = () => {
    var peop = [];
    db.collection("Chats").orderBy('date','desc').onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.id.includes(user.id)) {
          if (doc.data().sender.id === user.id)
            peop.push(doc.data().receiver)
          else
            peop.push(doc.data().sender)
        }
      });
      const uniqueData = peop.reduce((acc,current)=>{
        const x = acc.find(item => item.id === current.id);
        if(!x)
        {
          return acc.concat([current]);
        }
        else{
          return acc;
        }
      },[]);
      setPeople(uniqueData);
    })
  }
  useEffect(() => {
    if (receiverId != 0) { newPeople() }
    getPeople();
  }, [])
  console.log(people)
  return (
    (
      <>
        <Header></Header>
      <div className='chat-container'>
          {/* <div className="people-container">
            {people.length !==0
              ?
              people.map((ele) => <button className="people" onClick={() => setSelectedPerson(ele)}>
                <div className="display">
                  <img src={userImg} alt="" />
                  <span>{ele.name}</span>
                </div>
              </button>)
              :
              <div style={{ color: 'black' }}>
                You currently don't have anybody you messaged please visit the buy page , choose a property and select message the owner to initiate convertation.
              </div>
            }
          </div> */}
          <Chatsidebar people={people} setSelectedPerson={setSelectedPerson}/>
        {selectedPerson ? <div className="chat-right">
          <div className="chat-top">
            <div className="display">
              <div className="img">{selectedPerson.name[0]}</div>
              <span>{selectedPerson?.name}</span>
            </div>
          </div>
          <Messages selectedPerson={selectedPerson} change={change} setchange={setchange} />
  
        </div>
          :
          <div className="chat-right">
            Please select a Person to chat with
          </div>
        }
      </div>
      </>
    )
  )
}

export default Chat
