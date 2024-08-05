import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Character1() {
  const [aiName, setAiName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const fetchImage = async () => {
    try {
      const response = await fetch(
        'https://noggin.rea.gent/arrogant-kangaroo-3642',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer rg_v1_9ouhh9rz2qvqvckja414scuwk8vl1ps9xvnf_ngk',
          },
          body: JSON.stringify({
            description: description,
          }),
        }
      );
      
      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
      } else {
        console.error('Error generating image:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handleGenerate = () => {
    fetchImage();
  };

  const handleRegenerate = () => {
    fetchImage();
  };

  const handleNext = () => {
    navigate('/character2', { state: { aiName, imageUrl } }); // pass data to Character2
  };

  const handleSave = () => {
    // save logic
    //console.log('Save functionality goes here');
  };

  useEffect(() => {
    if (imageUrl) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const img = new Image();
      img.onload = () => {
        canvas.width = 512;
        canvas.height = 512;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = imageUrl;
    }
  }, [imageUrl]);

  return (
    <div style={{ textAlign: 'center', padding: '16px', boxSizing: 'border-box' }}>
      <h3 style={{ fontSize: '18px' }}>Welcome, User</h3>
      <p style={{ fontSize: '14px' }}>Enter a name and description for your AI character and press Generate to meet your AI companion!</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ marginBottom: '8px' }}>
          <input
            type="text"
            value={aiName}
            onChange={(e) => setAiName(e.target.value)}
            placeholder="Enter AI name here"
            style={{ width: '100%', maxWidth: '300px', padding: '8px', boxSizing: 'border-box', textAlign: 'center', marginBottom: '8px' }}
          />
        </div>
        <div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description here"
            style={{ width: '100%', maxWidth: '300px', padding: '8px', boxSizing: 'border-box', textAlign: 'center' }}
          />
        </div>
        <button onClick={handleGenerate} style={{ marginTop: '8px', padding: '8px 16px' }}>Generate</button>
      </div>
      
      <canvas ref={canvasRef} style={{ border: '1px solid #ccc', maxWidth: '100%', maxHeight: '300px' }} />
      {imageUrl && (
        <div style={{ marginTop: '16px' }}>
          <button onClick={handleRegenerate} style={{ padding: '8px 16px', marginRight: '8px' }}>Regenerate</button>
          <button onClick={handleSave} style={{ padding: '8px 16px', marginRight: '8px' }}>Save</button>
          <button onClick={handleNext} style={{ padding: '8px 16px' }}>Next</button>
        </div>
      )}
    </div>
  );
}

export default Character1;
