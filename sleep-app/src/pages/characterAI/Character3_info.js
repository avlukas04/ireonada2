import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Container, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TopBar from '../../components/overall/TopBar';
import BottomIcons from '../../components/overall/BottomIcons';

function Character3_info() {
    const location = useLocation();
    const { aiName, imageUrl } = location.state || {}; // get data passed from Character1

    const streakBar = (isActive) => (
        <Box
            sx={{
                width: '20px',
                height: '20px',
                backgroundColor: isActive ? '#25C6FF' : '#ccc',
                borderRadius: '4px',
                marginRight: '4px'
            }}
        />
    );

    return (
        <div>
            <TopBar imageUrl={imageUrl}/>
            <Container maxWidth="sm" sx={{ mt: 4 }}> {/* Add margin-top here */}
                <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>Your AI Companion</Typography>
                    {imageUrl && (
                        <Box mb={2} sx={{ position: 'relative' }}>
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
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    bottom: '-16px', // Adjusted to move the icon further down
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '50%'
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Box>
                    )}
                    <Box mb={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '64px' }}>
                        <Box
                            sx={{
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                marginBottom: '8px',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography variant="h6" sx={{ textAlign: 'left' }}>Name: {aiName || 'N/A'}</Typography>
                            <IconButton size="small">
                                <EditIcon />
                            </IconButton>
                        </Box>
                        <Box
                            sx={{
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                marginBottom: '16px',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography variant="h6" sx={{ textAlign: 'left' }}>Age: N/A</Typography> {/* Placeholder for age */}
                        </Box>
                        <Typography variant="h6" sx={{ textAlign: 'left', width: '100%' }}>Streaks</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '16px' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    marginBottom: '8px',
                                    width: '100%',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography variant="h6" sx={{ textAlign: 'left' }}>Morning</Typography>
                                <Box sx={{ display: 'flex' }}>
                                    {Array.from({ length: 7 }).map((_, index) => streakBar(index < 5))} {/* Example: 5-day streak */}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    width: '100%',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography variant="h6" sx={{ textAlign: 'left' }}>Night</Typography>
                                <Box sx={{ display: 'flex' }}>
                                    {Array.from({ length: 7 }).map((_, index) => streakBar(index < 3))} {/* Example: 3-day streak */}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Container>
            <BottomIcons />
        </div>
    );
}

export default Character3_info;
