import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Character1 from './pages/characterAI/Character1'; 
import Character2 from './pages/characterAI/Character2'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Character1 />} />
        <Route path="/character2" element={<Character2 />} />
      </Routes>
    </Router>
  );
}

export default App;
