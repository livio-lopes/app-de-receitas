import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './components/Routes';
import Header from './components/Header';

function App() {
  return (
    <div className="meals">
      <Header />
      <Routes />
    </div>
  );
}

export default App;
