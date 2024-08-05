import React, { useState, useEffect } from 'react';
import BottomIcons from '../../components/overall/BottomIcons';
import TopBar from '../../components/overall/TopBar';

function Calling1() {
  //sets the blank input text and conversation
  const [inputText, setInputText] = useState('');
  const [conversation, setConversation] = useState([]);
  const [conversationStarted, setConversationStarted] = useState(false);
  
  //speech stuff
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;
  const recognition = new SpeechRecognition();

  //event handler for our input box
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  //the reagent api hehe
  const fetchResponse = async (conversation) => {
    console.log('Conversation before sending to API:', conversation);
      const response = await fetch('https://noggin.rea.gent/eastern-hummingbird-1320', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer rg_v1_sxep16s5urem435jtnjpn2ct878sexjumfcv_ngk',
        },
        body: JSON.stringify({
          "conversation_history": conversation.join('\n'),
        }),
      });
  
      const responseData = await response.text();
      return `Character Name: ${responseData}`;
  };

  //gets user input
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
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <TopBar/>
      <div>
        {!conversationStarted && (
          <button onClick={handleStartConversation}>Start Conversation</button>
        )}
      </div>
      <div>
        <h2>Conversation History</h2>
        <div>
          {conversation.map((message, index) => (
            <div key={index}>
              {message}
            </div>
          ))}
        </div>
      </div>
      {conversationStarted && (
        <div>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type a message"
          />
          <button onClick={() => handleSend(inputText)}>Send</button>
          <button onClick={startListening}>🎤</button>
        </div>
      )}
      <BottomIcons/>
    </div>
  );
}

export default Calling1;