import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import Home from './pages/Home';
import Auth from './pages/Auth';


function App() {
  return (
    <Router>

        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
    </Router>
  );
}

export default App;

