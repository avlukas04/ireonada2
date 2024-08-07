import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, Paper, Stack } from '@mui/material';
import TopBar from '../../components/overall/TopBar';
import BottomIcons from '../../components/overall/BottomIcons';

function Character2() {
  const location = useLocation();
  const { aiName, imageUrl } = location.state || {}; // get data passed from Character1
  const navigate = useNavigate();

  return (
    <div>
      <TopBar imageUrl={imageUrl}/>
      <Container maxWidth="sm" sx={{ mt: 4 }}> {/* Add margin-top here */}
        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>Hi, User!</Typography>
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
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button 
              variant="contained" 
              onClick={() => navigate('/character3', { state: { aiName, imageUrl } })}
              sx={{ 
                backgroundColor: '#25C6FF',
                '&:hover': { backgroundColor: '#1da9e0' } 
              }}
            >
              AI
            </Button>
            <Button 
              variant="contained" 
              onClick={() => navigate('/character4', { state: { aiName, imageUrl } })}
              sx={{ 
                backgroundColor: '#25C6FF',
                '&:hover': { backgroundColor: '#1da9e0' } 
              }}
            >
              Closet
            </Button>
            <Button 
              variant="contained" 
              onClick={() => navigate('/character5', { state: { aiName, imageUrl } })}
              sx={{ 
                backgroundColor: '#25C6FF',
                '&:hover': { backgroundColor: '#1da9e0' } 
              }}
            >
              Leaderboard
            </Button>
          </Stack>
        </Paper>
      </Container>
      <BottomIcons/>
    </div>
  );
}

export default Character2;
