import React from 'react';
import { useLocation } from 'react-router-dom';

function Character3_info() {
  //constant img and name 
  const location = useLocation();
  const { aiName, imageUrl } = location.state || {}; // get data from Character1

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
        <div>
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{aiName}</p>
        </div>
      )}
    </div>
  );

  //ai info
  
}

export default Character3_info;
