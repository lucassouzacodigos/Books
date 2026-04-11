import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from "react";
import ReactDOM from "react-dom/client";
import './App.css'
import LoginPage from './Pages/LoginPage'
import Cadastro from './Pages/Cadastro'
import { ToastContainer } from 'react-toastify';
import Admin from './Pages/Admin'
import Home from './Pages/Home'
import Author from './Pages/Author'
import NavBar from './Components/NavBar'
import UsuarioComum from './Pages/UsuarioComum'
import ProtectedRouter from './helpers/protectedRouter';
import { BrowserRouter,  Routes, Route } from 'react-router-dom';



function App() {
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path='author' element={<Author/>}></Route>
          <Route path='/admin' element={<ProtectedRouter teste={"teste"} roles={["admin"]}> <Admin/> </ProtectedRouter>} />
          <Route path='/' element={<ProtectedRouter> <Home/> </ProtectedRouter>} />
          <Route path='/usuariocomum' element={<UsuarioComum/>} />
          <Route path='/cadastro' element={<Cadastro/>} />
          <Route path='/login' element={<LoginPage/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
}






export default App
