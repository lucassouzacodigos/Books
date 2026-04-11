import { Link, useNavigate } from "react-router-dom"
import '../App.css'
import NavBar from '../Components/NavBar'

export default function Admin(){

    const router = useNavigate()


    return (
        <div className="container">
            <NavBar/>
            <div style={{width:"30%", borderRadius:15, height:"10%", backgroundColor:"red", fontSize:40, display:"flex", alignItems:"center", justifyContent:"center"}}>ADMIN</div>
            <p>bem vindo a pagina <span className='destaque'>Admin</span></p>

            <Link className='navigator' style={{backgroundColor:"orange"}} to="/usuariocomum">Usuario Comum</Link>
            <Link className='navigator' style={{backgroundColor:"blue"}} to="/">Home</Link>
        </div>
    )
}