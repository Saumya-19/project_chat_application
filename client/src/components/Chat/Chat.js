import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = process.env.NODE_ENV === 'production' 
  ? 'https://project-chat-application.herokuapp.com/' 
  : 'http://localhost:5000';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on('userTyping', (userName) => {
      setTypingUsers(prev => {
        if (!prev.includes(userName)) {
          return [...prev, userName];
        }
        return prev;
      });
    });

    socket.on('userStoppedTyping', (userName) => {
      setTypingUsers(prev => prev.filter(user => user !== userName));
    });

    return () => {
      socket.off('message');
      socket.off('roomData');
      socket.off('userTyping');
      socket.off('userStoppedTyping');
    };
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => {
        setMessage('');
        setIsTyping(false);
        socket.emit('stopTyping');
      });
    }
  }

  const handleTyping = (value) => {
    setMessage(value);
    
    if (value && !isTyping) {
      setIsTyping(true);
      socket.emit('typing');
    } else if (!value && isTyping) {
      setIsTyping(false);
      socket.emit('stopTyping');
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={handleTyping} sendMessage={sendMessage} />
          {typingUsers.length > 0 && (
            <div className="typingIndicator">
              {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
            </div>
          )}
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
