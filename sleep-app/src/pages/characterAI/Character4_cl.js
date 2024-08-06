import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Container, Paper, Grid } from '@mui/material';

function Character4_cl() {
  const location = useLocation();
  const { aiName, imageUrl } = location.state || {}; // get data passed from Character1

  const accessories = [
    { name: 'Glasses', imageUrl: 'path_to_glasses_image.jpg' },
    { name: 'Sunglasses', imageUrl: 'path_to_sunglasses_image.jpg' },
    { name: 'Hat', imageUrl: 'path_to_hat_image.jpg' },
    { name: 'Beanie', imageUrl: 'path_to_beanie_image.jpg' },
    { name: 'Face Mask', imageUrl: 'path_to_facemask_image.jpg' },
    { name: 'Scarf', imageUrl: 'path_to_scarf_image.jpg' },
  ];

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Closet</Typography>
        {imageUrl && (
          <Box mb={2}>
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
          </Box>
        )}
        {aiName && (
          <Box mb={2}>
            <Typography variant="h6" fontWeight="bold">{aiName}</Typography>
          </Box>
        )}
        
        {/* grid */}
        <Box mt={4}>
          <Grid container spacing={2} justifyContent="center">
            {accessories.map((accessory, index) => (
              <Grid item key={index} xs={6} sm={4} md={3}>
                <Paper elevation={1} sx={{ padding: 1, textAlign: 'center' }}>
                  <img
                    src={accessory.imageUrl}
                    alt={accessory.name}
                    style={{ 
                      width: '100%', 
                      height: '100px', 
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                  <Typography variant="body2" mt={1}>{accessory.name}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default Character4_cl;
