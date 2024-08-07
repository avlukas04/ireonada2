import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Container, Paper, Grid } from '@mui/material';
import TopBar from '../../components/overall/TopBar';
import BottomIcons from '../../components/overall/BottomIcons';

function Character4_cl() {
  const location = useLocation();
  const { aiName, imageUrl } = location.state || {}; // get data passed from Character1
  const [updatedImageUrl, setUpdatedImageUrl] = useState(imageUrl);
  const canvasRef = useRef(null);

  // accs URLS
  const accessoryImages = {
    Glasses: 'https://cdn-icons-png.flaticon.com/512/1785/1785384.png',
    Sunglasses: 'https://cdn-icons-png.flaticon.com/512/146/146637.png',
    Hat: 'https://cdn-icons-png.flaticon.com/512/1785/1785366.png',
    Beanie: 'https://cdn-icons-png.flaticon.com/512/616/616046.png',
    'Face Mask': 'https://cdn-icons-png.flaticon.com/512/2833/2833174.png',
    Scarf: 'https://cdn-icons-png.flaticon.com/512/2290/2290533.png'
  };

  // combine images using canvas
  const combineImages = async (characterImageUrl, accessoryImageUrl) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const characterImg = new Image();
    const accessoryImg = new Image();

    characterImg.crossOrigin = 'Anonymous'; // CORS for external images
    accessoryImg.crossOrigin = 'Anonymous'; // CORS for external images

    characterImg.src = characterImageUrl;
    accessoryImg.src = accessoryImageUrl;

    return new Promise((resolve) => {
      characterImg.onload = () => {
        canvas.width = characterImg.width;
        canvas.height = characterImg.height;
        ctx.drawImage(characterImg, 0, 0);

        accessoryImg.onload = () => {
          // acc put on
          ctx.drawImage(accessoryImg, 0, 0, characterImg.width, characterImg.height);

          // update image URL
          const combinedImageUrl = canvas.toDataURL('image/png');
          resolve(combinedImageUrl);
        };
      };
    });
  };

  const handleAccessoryClick = async (accessoryName) => {
    const accessoryImageUrl = accessoryImages[accessoryName];
    if (accessoryImageUrl) {
      const combinedImageUrl = await combineImages(imageUrl, accessoryImageUrl);
      setUpdatedImageUrl(combinedImageUrl);
    }
  };

  return (
    <div>
      <TopBar imageUrl={imageUrl}/>
      <Container maxWidth="sm" sx={{ mt: 4 }}> {/* Add margin-top here */}
        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>Closet</Typography>
          {updatedImageUrl && (
            <Box mb={2}>
              <img
                src={updatedImageUrl}
                alt="AI Character"
                style={{ 
                  width: '150px', 
                  height: '150px', 
                  borderRadius: '50%', 
                  border: '2px solid #ccc',
                  objectFit: 'cover'
                }}
              />
            </Box>
          )}
          {aiName && (
            <Box mb={2}>
              <Typography variant="h6" fontWeight="bold">{aiName}</Typography>
            </Box>
          )}
          
          {/* acc grid */}
          <Box mt={4}>
            <Grid container spacing={2} justifyContent="center">
              {Object.keys(accessoryImages).map((accessoryName, index) => (
                <Grid item key={index} xs={6} sm={4} md={3}>
                  <Paper 
                    elevation={1} 
                    sx={{ padding: 1, textAlign: 'center', cursor: 'pointer' }} 
                    onClick={() => handleAccessoryClick(accessoryName)}
                  >
                    <img
                      src={accessoryImages[accessoryName]}
                      alt={accessoryName}
                      style={{ 
                        width: '100%', 
                        height: '100px', 
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                    <Typography variant="body2" mt={1}>{accessoryName}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* canvas to combine images */}
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </Paper>
      </Container>
      <BottomIcons/>
    </div>
  );
}

export default Character4_cl;
