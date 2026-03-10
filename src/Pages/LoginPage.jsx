
import { useState } from 'react'
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '../App.css'
import InputNomeado from '../Components/InputNomeado';
import foto from '../assets/123.png'
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    const navigate = useNavigate()

    const login = async () => {
        alert("Logou")
    }

    const cadastro = async () => {
        navigate("/cadastro")
    }



    return (
    <div className='container'>
      
        <div style={{height:"100%", width:"50%", backgroundColor:"#4cbce6", display:'flex', alignItems:"center", justifyContent:"center"}}>
            <img src={foto}/>
        </div>

      <div className='loginBox'>
        <p className='tituloLogin'>ALUNOID BOOKS</p>
        <InputNomeado largura={380} titulo={"Email:"}></InputNomeado>
        <InputNomeado type={"password"} largura={380} titulo={"Senha:"}></InputNomeado>

        <button className='botao' onClick={login} style={{backgroundColor:"black", marginTop:20, color:"white", fontWeight:"bold"}}>Entrar!</button>
        
        <a onClick={cadastro} className='cadastre'>Cadastre-se</a>

      </div>

    </div>
  )
}