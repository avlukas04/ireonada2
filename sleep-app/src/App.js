import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Character1 from './pages/characterAI/Character1'; 
import Character2 from './pages/characterAI/Character2'; 
import AIPage from './pages/characterAI/Character3_info';
import Closet from './pages/characterAI/Character4_cl';
import Leaderboard from './pages/characterAI/Character5_lb';

function App() {
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<Character1 />} />
  //       <Route path="/character2" element={<Character2 />} />
  //       <Route path="/ai-page" element={<AIPage />} />
  //       <Route path="/closet" element={<Closet />} />
  //       <Route path="/leaderboard" element={<Leaderboard />} />
  //     </Routes>
  //   </Router>
  // );
}

export default App;
