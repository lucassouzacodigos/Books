

import { Link } from 'react-router-dom'
import '../App.css'





export default function NavBar(){




    return(
        <div style={{height:"10dvh", width:"100dvw", backgroundColor:"white", display:"flex", alignItems:"center", justifyContent:"center",position:"fixed", top:0, borderBottom:"black", borderWidth:2, borderWidth:2, borderStyle:"solid", zIndex:9999}}>
            <Link to="/" className='navItem' >Home</Link>
            <Link to="/author" className='navItem' >Authors</Link>
            <Link to="/Books" className='navItem' >Books</Link>
            <Link to="/perfil" className='navItem' >Perfil</Link>
        </div>
    )
}