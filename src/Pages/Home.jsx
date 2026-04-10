import '../App.css'
import { Link, useNavigate } from "react-router-dom"



export default function Home(){

    return (
        <div className='container'>
            <div style={{width:"30%",  borderRadius:15, height:"10%", backgroundColor:"blue", fontSize:40, display:"flex", alignItems:"center", justifyContent:"center"}}>HOME</div>
            <p>bem vindo a pagina <span className='destaque'>HOME</span></p>

            <Link className='navigator' style={{backgroundColor:"red"}} to="/Admin">Admin</Link>
            <Link className='navigator' style={{backgroundColor:"orange"}} to="/usuariocomum">Usuario Comum</Link>
        </div>
    )
}