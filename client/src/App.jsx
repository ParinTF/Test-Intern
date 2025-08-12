import React from 'react';
import UserList from './components/UserList';
import './App.css'; // นำเข้าไฟล์ CSS ของแอปพลิเคชัน
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <UserRegister />
        </header>
      </div>
    </>
  );
}

export default App;
