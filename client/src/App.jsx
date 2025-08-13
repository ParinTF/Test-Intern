import React, { useState } from 'react';
import UserList from './components/UserList';
import './App.css';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // สถานะการล็อกอิน
  const [token, setToken] = useState(null); // เก็บ JWT Token
  console.log('Token:', token);
  console.log('Authorization Header:', `Bearer ${token}`);
  return (
    <div className="App">
      <header className="App-header">
        {!isLoggedIn ? (
          <>
            <UserRegister />
            <UserLogin setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
          </>
        ) : (
          <UserList token={token} />
          
        )}
        
      </header>
    </div>
  );
}

export default App;
