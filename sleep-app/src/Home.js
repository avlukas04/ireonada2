import React from 'react'
import Button from '@mui/material/Button';


function Home() {
  return (
    <div>
        <Button variant="contained" href="/bedtime">Bedtime Story</Button>     
        <Button variant="contained" href="/calling">Calling AI</Button>     
        <Button variant="contained" href="/character">Character AI</Button>     
    </div>
  )
}

export default Home
