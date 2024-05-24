import React from 'react';
import DarkModeToggle from './components/DarkModeToggle';
import { useDarkMode } from './components/DarkModeContext';
import './App.css';
import MessageWithBot from './components/MessageWithBot';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import data from "./Data.json"

function App() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <DarkModeToggle />
      <Routes>
        <Route path='/home' element={<Home data={data}/>}/>
        <Route path='/messages' element={<MessageWithBot/>}/>
        {/* <Route path='' element={}/> */}
      </Routes>
    </div>
  );
}

export default App;
