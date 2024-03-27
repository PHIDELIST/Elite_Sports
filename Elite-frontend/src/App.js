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
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_CLIENT_ID,
  }
});
function App() {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <div className="App">        
        <Routes>
          <Route exact path="/" element={token? <LandingPage /> : <LoginPage />} />
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
