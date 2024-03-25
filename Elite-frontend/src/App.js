import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './Components/LandingPage';
import FieldsPage from './Components/FieldsPage';
import LoginPage from './Components/LoginPage';
import SignUp from './Components/SignUp';
import ConfirmationPage from './Components/Confirm';
import { Amplify } from 'aws-amplify'; 


Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "",
    userPoolWebClientId: "",
  }
});

function App() {
  return (
    <Router>
      <div className="App">        
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/fields" element={<FieldsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/confirm' element={<ConfirmationPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
