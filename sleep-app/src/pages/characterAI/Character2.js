import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Character2() {
  //constant img and name 
  const location = useLocation();
  const navigate = useNavigate();
  const { aiName, imageUrl } = location.state || {}; // get data from Character1

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div style={{ textAlign: 'center', padding: '16px' }}>
      <h3>Hi, User!</h3>
      {imageUrl && (
        <div style={{ marginBottom: '16px' }}>
          <img
            src={imageUrl}
            alt="AI Character"
            style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%', 
              border: '2px solid #ccc',
              objectFit: 'cover'
            }}
          />
        </div>
      )}
      {aiName && (
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{aiName}</p>
        </div>
      )}
      <div>
        <button 
          onClick={() => handleNavigate('/ai-page')} 
          style={{ padding: '8px 16px', margin: '8px' }}
        >
          AI Page
        </button>
        <button 
          onClick={() => handleNavigate('/closet')} 
          style={{ padding: '8px 16px', margin: '8px' }}
        >
          Closet
        </button>
        <button 
          onClick={() => handleNavigate('/leaderboard')} 
          style={{ padding: '8px 16px', margin: '8px' }}
        >
          Leaderboard
        </button>
      </div>
    </div>
  );
}

export default Character2;
