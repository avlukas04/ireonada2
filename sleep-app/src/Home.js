import * as React from 'react';
import Button from '@mui/material/Button';
import BottomIcons from './components/overall/BottomIcons';
import TopBar from './components/overall/TopBar';
import HomeTopBar from './components/overall/HomeTopBar';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { red } from '@mui/material/colors';
import AlarmBackground from './images/alarm-background.png';
import BedtimeBackground from './images/bedtime-background.png';
import './Home.css'
import Curve from './images/curve.png'
import Box from '@mui/material/Box';
import Animal1 from './images/animal1.png';
import Animal2 from './images/animal2.png';
import Animal3 from './images/animal3.png';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  const handleAlarmClick = () => {
    navigate('/calling');
  };

  const handleBedtimeClick = () => {
    navigate('/bedtime');
  };

  return (
    <div >
      <HomeTopBar/>
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
        <Box onClick={handleAlarmClick}>
          <Card sx={{
            width: 384, height: 216, backgroundImage: `url(${AlarmBackground})`, backgroundSize: 'cover', backgroundPosition: 'center',
            borderTopLeftRadius: '40px',
            borderBottomRightRadius: '40px'
          }} />
        </Box>

        <Box onClick={handleBedtimeClick}>
          <Card sx={{
            width: 384, height: 216, backgroundImage: `url(${BedtimeBackground})`, backgroundSize: 'cover', backgroundPosition: 'center',
            borderTopLeftRadius: '40px',
            borderBottomRightRadius: '40px'
          }} />
        </Box>
      </div>
      <p className="homepage-caption">Example cute characters</p>
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
