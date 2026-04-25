



export default function InputNomeado({titulo, largura, type, valor, value}){
    return(
        <div style={{ flexDirection:"column", display:"flex", width:"100%", alignItems:"start", justifyContent:"center", backgroundColor:"transparent"}}>
            <p htmlFor="input" style={{marginRight:10, fontWeight:"bold", marginBottom:-1, marginLeft:5}}>
                {titulo}
            </p>
            <input value={value} onChange={(e) => valor(e.target.value)} id="input" type={type ? type : "text"} className="InputNomeado" style={{width:largura, fontWeight:"bold", fontSize:15, marginLeft:5}}/>
        </div>
    )
}