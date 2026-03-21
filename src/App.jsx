import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import LoginPage from './Pages/LoginPage'
import Cadastro from './Pages/Cadastro'
import { ToastContainer } from 'react-toastify';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>
    </>
  );
}






export default App
