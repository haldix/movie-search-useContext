import React from 'react';
import './styles/Message.scss';

const Message = ({ message }) => {
  return (
    <div className='message'>
      <p className='message-content'>{message}</p>
    </div>
  );
};

export default Message;
