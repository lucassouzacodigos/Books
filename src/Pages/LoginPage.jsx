
import { useState } from 'react'
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '../App.css'
import InputNomeado from '../Components/InputNomeado';
import foto from '../assets/123.png'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';
import api from '../services/api';


export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const router = useNavigate()



    const login = async () => {
      

      try{

      const response = await api.post("/login", {
        email: email,
        password: senha
      })
      localStorage.setItem("token", response.data.token)
      setTimeout(() => {
        router("/")
      }, 500);
      
      
      toast.success(response.data.response, {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
    }
      catch(err){
        console.log(err)
        toast.warn(err.response.data.response, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }


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
        <InputNomeado valor={setEmail} largura={380} titulo={"Email:"}></InputNomeado>
        <InputNomeado valor={setSenha} type={"password"} largura={380} titulo={"Senha:"}></InputNomeado>

        <button className='botao' onClick={login} style={{backgroundColor:"black", marginTop:20, color:"white", fontWeight:"bold"}}>Entrar!</button>
        
        <a onClick={cadastro} className='cadastre'>Cadastre-se</a>

      </div>

    </div>
  )
}