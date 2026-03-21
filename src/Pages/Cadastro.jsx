
import { useState } from 'react'
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '../App.css'
import InputNomeado from '../Components/InputNomeado';
import foto from '../assets/123.png'
import { useNavigate } from "react-router-dom";
import cadastroicon from '../assets/forma.png'
import axios from 'axios';
import api from '../services/api.js'
import { Bounce, toast } from 'react-toastify';

export default function Cadastro(){

    const router = useNavigate()
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [usuario, setUsuario] = useState("")
    const [tipo, setTipo] = useState("")

    const cadastrar = async () => {
        try{
            const response = await api.post("/user", {
                name: usuario,
                email: email,
                password: senha,
                typeUser: tipo
            })
            toast.success(response.data.response, {
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

    const voltar = async () => {
        router("/login")
    }



    return(
        <div className='container' style={{backgroundColor:"#4cbce6"}}>
            
            <img src={cadastroicon}></img>
            <div className='cadastroBox' style={{}}>
                <InputNomeado valor={setEmail} titulo="Email: " ></InputNomeado>
                <InputNomeado valor={setSenha} titulo="Senha: " ></InputNomeado>
                <InputNomeado valor={setUsuario} titulo="Nome de usuario: " ></InputNomeado>


                <select onChange={(e) => setTipo(e.target.value)} className='select'>
                    <option value="">Tipo de Usuario</option>
                    <option value="admin">Admin</option>
                    <option value="comum">Usuario</option>
                </select>

                <button className='botao' onClick={cadastrar} style={{marginTop:15,  backgroundColor:"#00FF7F"}}>Cadastrar-se</button>

                <button className='botao' onClick={voltar} style={{marginTop:15, backgroundColor:"#4169E1"}}>Voltar</button>
                
            </div>


        </div>
    )
}