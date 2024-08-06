import * as React from 'react';
import Button from '@mui/material/Button';
import BottomIcons from './components/overall/BottomIcons';
import TopBar from './components/overall/TopBar';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { red } from '@mui/material/colors';
import AlarmBackground from '/Users/liwensun/Desktop/ireonada2/sleep-app/src/images/alarm-background.png';
import BedtimeBackground from '/Users/liwensun/Desktop/ireonada2/sleep-app/src/images/bedtime-background.png'
import '/Users/liwensun/Desktop/ireonada2/sleep-app/src/Home.css'
import Curve from '/Users/liwensun/Desktop/ireonada2/sleep-app/src/images/curve.png'
import Box from '@mui/material/Box';
import Animal1 from '/Users/liwensun/Desktop/ireonada2/sleep-app/src/images/animal1.png';
import Animal2 from '/Users/liwensun/Desktop/ireonada2/sleep-app/src/images/animal2.png';
import Animal3 from '/Users/liwensun/Desktop/ireonada2/sleep-app/src/images/animal3.png';

function Home() {

  return (
    <div >
      <TopBar />
      <div className="blue-background">
        <p className="homepage-hello">Hello</p>
        <Box
          component="img"
          sx={{
            display: 'block',
            marginTop: 0,
            width: 430,
            height: 'auto',
          }}
          src={Curve}
          alt="Example Image"
        />
      </div>
      <div className="center-card">

        <Card sx={{
          width: 384, height: 216, backgroundImage: `url(${AlarmBackground})`, backgroundSize: 'cover', backgroundPosition: 'center',
          borderTopLeftRadius: '40px',
          borderBottomRightRadius: '40px'
        }} />

        <Card sx={{
          width: 384, height: 216, backgroundImage: `url(${BedtimeBackground})`, backgroundSize: 'cover', backgroundPosition: 'center',
          borderTopLeftRadius: '40px',
          borderBottomRightRadius: '40px'
        }} />
      </div>
      <p className="homepage-caption">Explore cute characters</p>
      <div className="example-characters">
        <Box
          component="img"
          sx={{
            display: 'block',
            marginTop: 0,
            width: 100,
            height: 'auto',
          }}
          src={Animal2}
          alt="Example Image"
        />
        <Box
          component="img"
          sx={{
            width: 100,
            height: 'auto',
          }}
          src={Animal1}
          alt="Example Image"
        />
        <Box
          component="img"
          sx={{
            width: 100,
            height: 'auto',
          }}
          src={Animal3}
          alt="Example Image"
        />
      </div>
    
      <BottomIcons />
    </div>
  )
}

export default Home
