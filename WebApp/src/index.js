import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login/Login';
import User from './User/User';
import InsertTools from './insertTools/InsertTool';
import Profile from './Profile/Profile';
import TableView from './Tools/TableView';

// Render all the routes for the pages
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/App" element={<App />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/InsertTool" element={<InsertTools />}></Route>
        <Route path="/User" element={<User />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

