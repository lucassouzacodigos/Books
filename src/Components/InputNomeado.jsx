



export default function InputNomeado({titulo, largura, type}){
    return(
        <div style={{ flexDirection:"column", display:"flex", width:"100%", alignItems:"start", justifyContent:"center"}}>
            <p htmlFor="input" style={{marginRight:10, fontWeight:"bold", marginBottom:-1}}>
                {titulo}
            </p>
            <input  id="input" type={type ? type : "text"} className="InputNomeado" style={{width:largura, fontWeight:"bold", fontSize:15}}/>
        </div>
    )
}