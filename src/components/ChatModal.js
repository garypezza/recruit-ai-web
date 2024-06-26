import React, { useState, useEffect, useRef } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import '../styles/ChatModal.css';
import axiosInstance from '../services/axiosInstance';

const ChatModal = ({ open, handleClose, student }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [threadId, setThreadId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const openingMessage = 

  `Hi <first name>! I'm an AI-based college golf recruitment consultant. I'm here to ensure your recruiting journey is successful using my knowledge of the entire recruiting process and best practices. 
  
  I also have information about all 1100+ college golf programs in the U.S. including coach names and email addresses, roster makeup, scoring data and how many spots a coach will need to fill from your graduating class. I can help you find likely fits based on your golf resume, academic profile and school preferences. 
  
  Ask me anything! Some common questions and requests to get you started:
  
  - How do I create a compelling golf resume that will get me noticed by coaches?
  - What tournaments should I play in to have a chance to play at a DI, DII, or DIII school?
  - Write me an email that's likely to get noticed by a coach based on my profile information.
  - What specific schools should I target based on my scores and preferences?`


  useEffect(() => {
    if (open && student) {
      setIsLoading(true);
      axiosInstance.post('/chats/newChat')
        .then(response => {
          const threadId = response.data.threadId; // Retrieve threadId from response
          setThreadId(threadId);
          const openingMessageWithName = replaceFirstName(openingMessage, student.name);
          
          // Make the second axios call inside the first axios call's .then() block
          axiosInstance.post('/chats/message', 
            { prompt: "Here is some information about me " + JSON.stringify(student) + 
            " Treat this as additional information but no need to respond yet", threadId: threadId })
            .then(response => {
              setIsLoading(false);
              setMessages([{ text: openingMessageWithName, user: false }]);
            })
            .catch(error => {
              console.error('Error sending message:', error);
              setIsLoading(false);
            });
        })
        .catch(error => {
          console.error('Error creating new thread:', error);
          setIsLoading(false);
        });
    }
  }, [open, openingMessage, student]);
  
  

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

  function replaceFirstName(text, fullName) {
    let [firstName] = fullName.split(" ");
    const regex = /<first name>/g;
    return text.replace(regex, firstName);
  }

  async function sendMessageToGPT(text, threadId, instructions) {
    try {
      const response = await axiosInstance.post('/chats/message', { prompt: text, threadId: threadId });
      return response.data.message.trim();
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      return "Failed to fetch response.";
    }
  };

  function formatMarkdownText(input) {
    // Replace escaped newlines with actual newline characters
    let correctedText = input.replace(/\\n/g, '\n');

    // Remove spaces before headings to prevent them from being seen as code blocks
    correctedText = correctedText.replace(/(^\s+|\s+$|^)(#{1,6})([ \t]+)/gm, '$1$2 ');

    return correctedText;
  }

  const ChatMessage = ({ text }) => {
    // Format the text to ensure proper Markdown rendering
    const formattedText = formatMarkdownText(text);

    return (
      <ReactMarkdown>{formattedText}</ReactMarkdown>
    );
  }

  return (
    <Modal open={open} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box className="modalContainer">
        <Box className="messageArea">
          {isLoading ? (
            <Box className="loadingDots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </Box>
          ) : (
            <>
              {messages.map((msg, index) => (
                <Box key={index} className={msg.user ? "userMessage" : "aiMessage"}>
                  <ChatMessage text={msg.text} />
                </Box>
              ))}
              {isTyping && (
                <Box className="typingIndicator">
                  <div className="typingDot"></div>
                  <div className="typingDot"></div>
                  <div className="typingDot"></div>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </Box>
        <Box component="form" onSubmit={handleSendMessage} className="formContainer" noValidate>
          <TextField fullWidth variant="outlined" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} sx={{ mb: 2 }} />
          <Button variant="contained" type="submit">Send</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ChatModal;
