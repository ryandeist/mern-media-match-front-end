import { useContext } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import NavBar from './components/NavBar/NavBar';
// import SignUpForm from './components/SignUpForm/SignUpForm';
// import SignInForm from './components/SignInForm/SignInForm';
// import Landing from './components/Landing/Landing';
// import Dashboard from './components/Dashboard/Dashboard';
import { UserContext } from './contexts/UserContext';

const App = () => {

  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
    </>
  );
};

export default App;