import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DarkModeProvider } from './components/DarkModeContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
