import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Stack, Paper } from '@mui/material';
import TopBar from '../../components/overall/TopBar';
import BottomIcons from '../../components/overall/BottomIcons';

function Character1() {
    const [aiName, setAiName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    const fetchImage = async (desc) => {
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
                        description: desc,
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
        fetchImage(description);
    };

    const handleRegenerate = () => {
        fetchImage(description);
    };

    const handleAutoGenerate = async () => {
        try {
            const response = await fetch(
                'https://noggin.rea.gent/external-beaver-5333',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer rg_v1_srl5w0zyalhylfs8gu4sbb1jt1coohj04zmu_ngk',
                    },
                    body: JSON.stringify({
                        // fill variables here if needed
                    }),
                }
            ).then(response => response.text());

            setDescription(response);
            fetchImage(response);
        } catch (error) {
            console.error('Error auto-generating description:', error);
        }
    };

    const handleNext = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const dataURL = canvas.toDataURL('image/png');
    
            localStorage.setItem('savedImage', dataURL);
            localStorage.setItem('savedName', aiName);
        }

        navigate('/character2', { state: { aiName, imageUrl } }); // pass data to Character2
    };

    const handleSave = () => {
        // save logic
        //console.log('Save function');
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const dataURL = canvas.toDataURL('image/png');
    
            localStorage.setItem('savedImage', dataURL);
            localStorage.setItem('savedName', aiName);
        }
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
        <div>
            <TopBar/>
            <Container maxWidth="sm" sx={{ mt: 4 }}> {/* Add margin-top here */}
                <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>Meet your AI companion!</Typography>
                    
                    <Stack spacing={2} alignItems="center">
                        <Typography variant="body1">Enter a name for your AI companion</Typography>
                        <TextField
                            label="AI Name"
                            value={aiName}
                            onChange={(e) => setAiName(e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                        <Typography variant="body1">Enter a description for your AI companion or Auto-Generate one!</Typography>
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                        <Stack direction="row" spacing={2}>
                            <Button 
                                variant="contained" 
                                onClick={handleGenerate} 
                                sx={{ backgroundColor: '#25C6FF', '&:hover': { backgroundColor: '#1da9e0' } }}
                            >
                                Generate
                            </Button>
                            <Button 
                                variant="contained" 
                                onClick={handleAutoGenerate} 
                                sx={{ backgroundColor: '#25C6FF', '&:hover': { backgroundColor: '#1da9e0' } }}
                            >
                                Auto-Generate
                            </Button>
                        </Stack>
                    </Stack>

                    <Box mt={2}>
                        <canvas ref={canvasRef} style={{ border: '1px solid #ccc', maxWidth: '100%', maxHeight: '300px' }} />
                        {imageUrl && (
                            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                                <Button 
                                    variant="contained" 
                                    onClick={handleRegenerate} 
                                    sx={{ backgroundColor: '#25C6FF', '&:hover': { backgroundColor: '#1da9e0' } }}
                                >
                                    Regenerate
                                </Button>
                                {/* <Button 
                                    variant="contained" 
                                    onClick={handleSave} 
                                    sx={{ backgroundColor: '#25C6FF', '&:hover': { backgroundColor: '#1da9e0' } }}
                                >
                                    Save
                                </Button> */}
                                <Button 
                                    variant="contained" 
                                    onClick={handleNext} 
                                    sx={{ backgroundColor: '#25C6FF', '&:hover': { backgroundColor: '#1da9e0' } }}
                                >
                                    Save
                                </Button>
                            </Stack>
                        )}
                    </Box>
                </Paper>
            </Container>
            <BottomIcons/>
        </div>
    );
}

export default Character1;
