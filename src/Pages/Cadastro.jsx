
import { useState } from 'react'
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '../App.css'
import InputNomeado from '../Components/InputNomeado';
import foto from '../assets/123.png'
import { useNavigate } from "react-router-dom";
import cadastroicon from '../assets/forma.png'

export default function Cadastro(){

    const router = useNavigate()
    const cadastrar = async () => {
        alert("teste")
    }

    const voltar = async () => {
        router("/login")
    }



    return(
        <div className='container' style={{backgroundColor:"#4cbce6"}}>
            
            <img src={cadastroicon}></img>
            <div className='cadastroBox' style={{}}>
                <InputNomeado titulo="Email: " ></InputNomeado>
                <InputNomeado titulo="Senha: " ></InputNomeado>
                <InputNomeado titulo="Nome de usuario: " ></InputNomeado>


                <select className='select'>
                    <option value="1">Admin</option>
                    <option value="2">Usuario</option>
                </select>

                <button className='botao' onClick={cadastrar} style={{marginTop:15,  backgroundColor:"#00FF7F"}}>Cadastrar-se</button>

                <button className='botao' onClick={voltar} style={{marginTop:15, backgroundColor:"#4169E1"}}>Voltar</button>
                
            </div>


        </div>
    )
}