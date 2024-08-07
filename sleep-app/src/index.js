import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './Home';
import CallingHome from './pages/callingAI/AlarmHome.js';
import Calling1 from './pages/callingAI/Calling1.js';
import Bedtime1 from './pages/bedtime/Bedtime1.js';
import Character1 from './pages/characterAI/Character1.js';
import Character2 from './pages/characterAI/Character2.js';
import Character3_info from './pages/characterAI/Character3_info.js';
import Character4_cl from './pages/characterAI/Character4_cl.js';
import Character5_lb from './pages/characterAI/Character5_lb.js';
import TopBar from './components/overall/TopBar.js';
import HomeTopBar from './components/overall/HomeTopBar.js';

import {
  createBrowserRouter,
  RouterProvider, Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/bedtime",
    element: <Bedtime1 />
  },
  {
    path: "/calling",
    element: <CallingHome />
  },
  {
    path: "/calling1",
    element: <Calling1 />
  },
  {
    path: "/character",
    element: <Character1 />
  },
  {
    path: "/character2",
    element: <Character2 />
  },
  {
    path: "/character3",
    element: <Character3_info />
  },
  {
    path: "/character4",
    element: <Character4_cl />
  },
  {
    path: "/character5",
    element: <Character5_lb />
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals.console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
