import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import AddExpense from './pages/AddExpense';
import AllExpense from './pages/AllExpense';
import EditExpense from './pages/EditExpense';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AllExpense" element={<AllExpense />} />
          <Route path="/AddExpense" element={<AddExpense />} />
          <Route path="/expense/:id/edit" element={<EditExpense />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
