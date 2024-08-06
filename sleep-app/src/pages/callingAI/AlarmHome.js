import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomIcons from '../../components/overall/BottomIcons';
import TopBar from '../../components/overall/TopBar';
import './AlarmHome.css';
import alarmSound from './ringtones/wakey_wakey.mp3';

const AlarmHome = () => {
  const navigate = useNavigate();
  const [alarmTime, setAlarmTime] = useState(new Date());
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
    const alarmTimeString = `${alarmTime.getHours().toString().padStart(2, '0')}:${alarmTime.getMinutes().toString().padStart(2, '0')}`;
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

  const handleTimeChange = (event) => {
    if (event.target.value) {
      const [hours, minutes] = event.target.value.split(':').map(Number);
      const newAlarmTime = new Date();
      newAlarmTime.setHours(hours, minutes, 0);
      setAlarmTime(newAlarmTime);
    }
  };

  if (alarmRinging) {
    return (
      <div className="alarm-container">
        <h1>Alarm is ringing!</h1>
        <button onClick={handleAccept} className="alarm-button">Accept</button>
      </div>
    );
  }

  return (
    <div className="alarm-container">
      <TopBar />
      <div>
        <h1>Welcome to Alarm Home</h1>
        <button onClick={navigateToCalling1} className="alarm-button">Go to Calling1</button>
        <div className="clock-container">
          <button onClick={showTimePickerModal} className="alarm-button">Add Alarm</button>
          {showTimePicker && (
            <>
              <div className="clock-text">
                {alarmTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <input
                type="time"
                onChange={handleTimeChange}
                className="alarm-time-picker"
                onClick={() => setShowTimePicker(true)}
                onFocus={() => setShowTimePicker(true)}
              />
              <button onClick={handleAddAlarm} className="alarm-button">Save Alarm</button>
              <button onClick={() => { setShowTimePicker(false); }} className="cancel-button">Cancel</button>
            </>
          )}
        </div>
        <div>
          <ul className="alarm-list">
            {alarms.map((alarm, index) => (
              <li key={index} className="alarm-item">
                {alarm}
                <button onClick={() => handleDeleteAlarm(index)} className="delete-button">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BottomIcons />
    </div>
  );
};

export default AlarmHome;