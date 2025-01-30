import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { showGame } from './services/userService';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import './App.css';
import { UserContext } from './contexts/UserContext';

const App = () => {
  const [settings, setSettings] = useState(["Indie"]);
  const { user } = useContext(UserContext);

  const fetchData = async () => {
    const data = await showGame(settings);
    console.log('Data:', data);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
      </Routes>
      <button onClick={fetchData}>Fetch Data</button>
    </>
  );
};

export default App;