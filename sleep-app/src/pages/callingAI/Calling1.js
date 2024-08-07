import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import BottomIcons from '../../components/overall/BottomIcons';
import TopBar from '../../components/overall/TopBar';
import Button from '@mui/material/Button';
import MicIcon from '@mui/icons-material/Mic';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';

function Calling1() {
  const [inputText, setInputText] = useState('');
  const [conversation, setConversation] = useState([]);
  const [conversationStarted, setConversationStarted] = useState(false);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;
  const recognition = useRef(new SpeechRecognition()).current;
  const hasFetched = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (!hasFetched.current) {
      handleStartConversation();
      hasFetched.current = true;
    }

    return () => {
      window.speechSynthesis.cancel();
      recognition.stop();
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== '/Calling1') {
      window.speechSynthesis.cancel();
      recognition.stop();
    }
  }, [location.pathname]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const fetchResponse = async (conversation) => {
    console.log('Conversation before sending to API:', conversation);
    try {
      const response = await fetch('https://noggin.rea.gent/eastern-hummingbird-1320', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer rg_v1_sxep16s5urem435jtnjpn2ct878sexjumfcv_ngk',
        },
        body: JSON.stringify({
          "conversation_history": conversation.join('\n'),
          "date": moment().format('YYYY-MM-DD')
        }),
      });

      const responseData = await response.text();
      const savedName = localStorage.getItem('savedName');
      return `${savedName || 'Character Name'}: ${responseData}`;
    } catch (error) {
      console.error('Error fetching response:', error);
      return 'An error occurred while fetching the response.';
    }
  };

  const handleSend = async (text) => {
    if (text.trim()) {
      const newConversation = [...conversation, `User: ${text}`];
      setConversation(newConversation);
      setInputText('');

      const apiResponse = await fetchResponse(newConversation);
      setConversation(prev => [...prev, apiResponse]);
      speak(apiResponse);
    }
  };

  const handleStartConversation = async () => {
    setConversation([]);
    setInputText('');
    setConversationStarted(true);

    const apiResponse = await fetchResponse([]);
    setConversation([apiResponse]);
    speak(apiResponse);
  };

  const handleStopConversation = () => {
    setConversationStarted(false);
    setConversation([]);
    setInputText('');
    window.speechSynthesis.cancel();
    recognition.stop();
  };

  const startListening = () => {
    recognition.start();
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    handleSend(transcript);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.35;
    utterance.pitch = 1.4;
    utterance.onend = () => {
      startListening();
    };
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <TopBar />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: "40px" }}>
        {!conversationStarted && (
          <Button variant="contained" sx={{ backgroundColor: '#25C6FF' }} onClick={handleStartConversation} className="start-convo">Start Conversation</Button>
        )}
      </div>

      <div>
        <Box sx={{ maxWidth: '86%', margin: '0 auto' }}>
          <h2 className="your-alarm">Conversation History</h2>
          <div>
            {conversation.map((message, index) => (
              <div key={index}>
                {message}
              </div>
            ))}
          </div>
        </Box>
      </div>

      {conversationStarted && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
          <div className="mic-group" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <TextField
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type a message"
            />
            <Button variant="contained" sx={{ backgroundColor: '#25C6FF', '&:hover': { backgroundColor: '#25C6FF' } }} onClick={() => handleSend(inputText)}>Send</Button>
            <Button variant="text" onClick={startListening}><MicIcon sx={{ color: '#25C6FF' }} /></Button>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: "20px" }}>
            <Button variant="contained" sx={{ backgroundColor: '#FF3B3B', fontSize: '18px', padding: '12px 24px' }} onClick={handleStopConversation} className="stop-convo">I'm Awake!</Button>
          </div>
        </div>
      )}

      <BottomIcons />
    </div>
  );
}

export default Calling1;
