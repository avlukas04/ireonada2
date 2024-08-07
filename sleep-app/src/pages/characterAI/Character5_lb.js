import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Container, Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper as MuiPaper } from '@mui/material';
import TopBar from '../../components/overall/TopBar';
import BottomIcons from '../../components/overall/BottomIcons';

function Character5_lb() {
  const location = useLocation();
  const { aiName, imageUrl } = location.state || {}; // get data passed from Character1

  const leaderboardData = [
    { rank: 1, name: 'John Doe', age: 25 },
    { rank: 2, name: aiName || 'Your AI', age: 30 },
    { rank: 3, name: 'Alice Johnson', age: 22 },
    { rank: 4, name: 'Bob Brown', age: 28 },
    { rank: 5, name: 'Charlie Davis', age: 35 }
  ];

  return (
    <div>
      <TopBar imageUrl={imageUrl}/>
      <Container maxWidth="sm" sx={{ mt: 4 }}> {/* Add margin-top here */}
        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>Leaderboard</Typography>
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
          
          {/* board */}
          <Box mt={4}>
            <TableContainer component={MuiPaper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Age</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboardData.map((row) => (
                    <TableRow 
                      key={row.rank}
                      sx={{ 
                        backgroundColor: row.rank === 2 ? '#f0f0f0' : 'inherit',
                        fontWeight: row.rank === 2 ? 'bold' : 'normal'
                      }}
                    >
                      <TableCell>{row.rank}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.age}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Container>
      <BottomIcons/>
    </div>
  );
}

export default Character5_lb;
