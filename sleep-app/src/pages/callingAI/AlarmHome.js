import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomIcons from '../../components/overall/BottomIcons';
import TopBar from '../../components/overall/TopBar';

const CallingHome = () => {
    const navigate = useNavigate();
  
    const navigateToCalling1 = () => {
      navigate('/calling1');
    };

  return (
    <div>
      <TopBar />
      <div>
        <h1>Welcome to Calling Home</h1>
        {/* Button to navigate to Calling1 */}
        <button onClick={navigateToCalling1}>Go to Calling1</button>
      </div>
      <BottomIcons />
    </div>
  );
};

export default CallingHome;