import '../App.css'
import { Link, useNavigate } from "react-router-dom"



export default function UsuarioComum(){

    const router = useNavigate()


    return (
        <div className="container">
            <div style={{width:"30%", borderRadius:15, height:"10%", backgroundColor:"orange", fontSize:40, display:"flex", alignItems:"center", justifyContent:"center"}}>USUARIO COMUM</div>
            <p>bem vindo a pagina <span className='destaque'>Usuario comum</span></p>

            <Link className='navigator' style={{backgroundColor:"blue", color:"white"}} to="/">Home</Link>
            <Link className='navigator' style={{backgroundColor:"red", color:"white"}} to="/Admin">Admin</Link>
        </div>
    )
}