import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RenderRouter from './router';
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <RenderRouter />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
