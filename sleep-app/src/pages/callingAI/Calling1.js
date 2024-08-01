import React, { useState, useEffect } from 'react';

function Calling1() {
  //sets the blank input text and conversation
  const [inputText, setInputText] = useState('');
  const [conversation, setConversation] = useState([]);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [initialFetch, setInitialFetch] = useState(false);

  //event handler for our input box
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  //the reagent api hehe
  const fetchResponse = async () => {
    try {
      console.log('Conversation before sending to API:', conversation);
      const response = await fetch('https://noggin.rea.gent/eastern-hummingbird-1320', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer rg_v1_sxep16s5urem435jtnjpn2ct878sexjumfcv_ngk',
        },
        body: JSON.stringify({
          "conversation": conversation.join('\n'),
        }),
      });
  
      const responseData = await response.text();
      
      setConversation(prev => [...prev, `Character Name: ${responseData}`]);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  useEffect(() => {
    if (conversation.length % 2 === 1 && conversation.length > 0) { 
      fetchResponse();
    }
  }, [conversation]);

  const handleSend = () => {
    if (inputText.trim()) {
      setConversation(prevConversation => {
        const updatedConversation = [...prevConversation, `User: ${inputText}`];
        return updatedConversation;
      });
      setInputText('');
    }
  };

  const handleStartConversation = async () => {
    setConversation([]);  
    setInputText('');
    setConversationStarted(true);
    fetchResponse();
    setInitialFetch(true);
  };

  return (
    <div>
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
          <button onClick={handleSend}>Send</button>
        </div>
      )}
    </div>
  );
}

export default Calling1;