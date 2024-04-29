import React, { useState, useEffect, useRef } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import './ChatModal.css';

const ChatModal = ({ open, handleClose, student }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [threadId, setThreadId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      axios.post(process.env.REACT_APP_RECRUIT_AI_API + '/chats/newChat')
        .then(response => {
          setThreadId(response.data.threadId);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error creating new thread:', error);
          setIsLoading(false);
        });
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { text: message, user: true }]);
      setIsTyping(true);
      const response = await sendMessageToGPT(message, threadId);
      setMessages(prev => [...prev, { text: response, user: false }]);
      setIsTyping(false);
      setMessage('');
    }
  };

  const sendMessageToGPT = async (text, threadId) => {
    try {
      const studentJSON = JSON.stringify(student);
      const personalizedInstructions =
        `The user is chatting with you via a chat dialog. They are looking for advice to get started on the college recruitment process. ` +
        `They are an avid high school golfer and want to golf in college.  They want to chat with coaches and make themselves known so` +
        `they can go to the college of their choice` +
        `here is some JSON describing the student ${studentJSON}`
      const response = await axios.post(process.env.REACT_APP_RECRUIT_AI_API + '/chats/message', { prompt: text, instructions: personalizedInstructions, threadId: threadId });
      return response.data.message.trim();
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      return "Failed to fetch response.";
    }
  };

  return (
    <Modal open={open} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box className="modalContainer">
  {isLoading ? (
    <Box className="loadingDots">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </Box>
  ) : (
    <>
      <Box className="messageArea">
        {messages.map((msg, index) => (
          <Box key={index} className={msg.user ? "userMessage" : "aiMessage"}>{msg.text}</Box>
        ))}
        {isTyping && (
            <Box className="typingIndicator">
              <div className="typingDot"></div>
              <div className="typingDot"></div>
              <div className="typingDot"></div>
            </Box>
          )}
          <div ref={messagesEndRef} />
      </Box>
      <Box component="form" onSubmit={handleSendMessage} className="formContainer" noValidate>
        <TextField fullWidth variant="outlined" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} sx={{ mb: 2 }} />
        <Button variant="contained" type="submit">Send</Button>
      </Box>
    </>
  )}
</Box>

    </Modal>
  );
};

export default ChatModal;
