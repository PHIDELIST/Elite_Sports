import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './Components/LandingPage';
import FieldsPage from './Components/FieldsPage';
import LoginSignup from './Components/LoginSignup'

function App() {
  return (
    <Router>
      <div className="App">        
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/fields" element={<FieldsPage />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
