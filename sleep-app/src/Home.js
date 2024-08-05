import React from 'react'
import Button from '@mui/material/Button';
import BottomIcons from './components/overall/BottomIcons';
import TopBar from './components/overall/TopBar';


function Home() {
  return (
    <div>
      <TopBar />
      <Button variant="contained" href="/bedtime">Bedtime Story</Button>
      <Button variant="contained" href="/calling">Calling AI</Button>
      <Button variant="contained" href="/character">Character AI</Button>
      <BottomIcons />
    </div>
  )
}

export default Home
