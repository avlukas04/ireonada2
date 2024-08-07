import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomIcons from '../../components/overall/BottomIcons';
import TopBar from '../../components/overall/TopBar';
import './AlarmHome.css';
import alarmSound from './ringtones/wakey_wakey.mp3';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const AlarmHome = () => {
  const navigate = useNavigate();
  const [alarmTime, setAlarmTime] = useState(dayjs(new Date()));
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [alarmRinging, setAlarmRinging] = useState(false);
  const alarmsRef = useRef(alarms);
  const audioRef = useRef(new Audio(alarmSound));

  useEffect(() => {
    const storedAlarms = JSON.parse(localStorage.getItem('alarms')) || [];
    setAlarms(storedAlarms);
    alarmsRef.current = storedAlarms;

    const checkAlarms = setInterval(() => {
      const currentTime = new Date();
      alarmsRef.current.forEach(alarm => {
        const [alarmHour, alarmMinute] = alarm.split(':').map(Number);
        if (
          currentTime.getHours() === alarmHour &&
          currentTime.getMinutes() === alarmMinute &&
          !alarmRinging
        ) {
          setAlarmRinging(true);
          audioRef.current.play();
        }
      });
    }, 1000);

    return () => clearInterval(checkAlarms);
  }, [alarmRinging]);

  useEffect(() => {
    alarmsRef.current = alarms;
  }, [alarms]);

  const handleAccept = () => {
    audioRef.current.pause();
    setAlarmRinging(false);
    navigate('/calling1');
  };

  const navigateToCalling1 = () => {
    navigate('/calling1');
  };

  const handleAddAlarm = () => {
    const alarmTimeString = alarmTime.format('HH:mm');
    if (!alarms.includes(alarmTimeString)) {
      const newAlarms = [...alarms, alarmTimeString];
      newAlarms.sort((a, b) => {
        const [aHour, aMinute] = a.split(':').map(Number);
        const [bHour, bMinute] = b.split(':').map(Number);
        return aHour - bHour || aMinute - bMinute;
      });
      setAlarms(newAlarms);
      localStorage.setItem('alarms', JSON.stringify(newAlarms));
      hideTimePickerModal();
    }
  };

  const handleDeleteAlarm = (index) => {
    const newAlarms = alarms.filter((_, i) => i !== index);
    setAlarms(newAlarms);
    localStorage.setItem('alarms', JSON.stringify(newAlarms));
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const hideTimePickerModal = () => {
    setShowTimePicker(false);
  };

  const handleTimeChange = (time) => {
    setAlarmTime(time);
  };

  if (alarmRinging) {
    return (
      <div className="alarm-container">
        <h1>Alarm is ringing!</h1>
        <Button variant="contained" sx={{ backgroundColor: '#25C6FF'}} onClick={handleAccept} className="alarm-button">Accept</Button>
      </div>
    );
  }

  return (
    <div className="alarm-container">
      <TopBar />
      {alarmRinging ? (
        <div style={{ textAlign: 'center' }}>
          <h1>Alarm is ringing!</h1>
          <Button variant="contained" sx={{ backgroundColor: '#25C6FF' }} onClick={handleAccept} className="alarm-button">Accept</Button>
        </div>
      ) : (
        <>
          <h1 className="your-alarm">Your Alarms</h1>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button variant="contained" onClick={navigateToCalling1} className="alarm-button" sx={{ backgroundColor: '#25C6FF' }}>Start Calling AI</Button>
          </Box>
          <div className="clock-container">
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="text" onClick={showTimePickerModal} className="alarm-button"><AddCircleOutlineIcon sx={{ color: '#25C6FF' }} /></Button>
            </div>
            {showTimePicker && (
              <div className="timepicker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker onAccept={handleTimeChange} value={alarmTime} />
                </LocalizationProvider>
                <Button variant="contained" sx={{ backgroundColor: '#25C6FF' }} onClick={handleAddAlarm} className="alarm-button">Save</Button>
                <Button variant="contained" sx={{ backgroundColor: '#25C6FF' }} onClick={hideTimePickerModal} className="cancel-button">Cancel</Button>
              </div>
            )}
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <List className="alarm-list">
              {alarms.map((alarm, index) => (
                <Card sx={{ width: '100%' }} key={index}>
                  <CardContent>
                    <div className="one-alarm">
                      <ListItemText primary={alarm} />
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#25C6FF',
                          '&:hover': { backgroundColor: '#25C6FF' },
                          '&:focus': { backgroundColor: '#25C6FF' }
                        }}
                        onClick={() => handleDeleteAlarm(index)}
                        className="delete-button">
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </List>
          </Box>
        </>
      )}
      <BottomIcons />
    </div>
  );
};

export default AlarmHome;