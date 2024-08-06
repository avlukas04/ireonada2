import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Stack, Paper } from '@mui/material';

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
    //console.log('Save function');
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
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Welcome, User</Typography>
        <Typography variant="body1" gutterBottom>
          Enter a name and description for your AI character and press Generate to meet your AI companion!
        </Typography>
        
        <Stack spacing={2} alignItems="center">
          <TextField
            label="AI Name"
            value={aiName}
            onChange={(e) => setAiName(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" onClick={handleGenerate}>Generate</Button>
        </Stack>

        <Box mt={2}>
          <canvas ref={canvasRef} style={{ border: '1px solid #ccc', maxWidth: '100%', maxHeight: '300px' }} />
          {imageUrl && (
            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
              <Button variant="contained" onClick={handleRegenerate}>Regenerate</Button>
              <Button variant="contained" onClick={handleSave}>Save</Button>
              <Button variant="contained" onClick={handleNext}>Next</Button>
            </Stack>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Character1;
