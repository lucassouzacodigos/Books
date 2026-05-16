import { useEffect, useState } from 'react'
import '../App.css'
import NavBar from '../Components/NavBar'
import api from '../services/api'
import InputNomeado from '../Components/InputNomeado'



export default function Author(){

    const [authors, setAuthors] = useState([])
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')
    const [novoNome, setNovoNome] = useState()
    const [novoNacionalidade, setNovoNacionalidade] = useState()
    const [dataNasc, setDataNasc] = useState()

    async function getAuthor(){
            try{
                const response = await api.get("/author")
                setAuthors(response.data.response || [])
            } catch(error) {
                setError(`Erro ao carregar dados de autor: ${error}`)
            } finally {
                setLoading(false)
            }
        }
    
    useEffect(() => {
        getAuthor()
    },[])

    if(loading) return <h1>Carregando...</h1>
    if(error) return <h1>{error}</h1>
    const [aba, setAba] = useState(null)
    const [confirma, setConfirma] = useState(false)
    const [selectedID, setSelectedID] = useState('')

    function handleEditar(author){
        setAba("editar")
        setNovoNome(author.name)
        setNovoNacionalidade(author.nationality)
        setDataNasc(new Date(author.birthdate).toLocaleDateString("pt-BR"))
        setSelectedID(author.id)
    }

    async function handleExcluir(author){
        setAba("excluir")
        setSelectedID(author.id)
    }

    function handleCriar(author){
        setAba("criar")
        
    }

    async function deletarAuthor(){
        await api.delete(`/author/delete/${selectedID}`)
    }

    const criarAutor = async () => {
        const response = await api.post(`/author/adicionar`, {
            name: novoNome,
            birthdate: dataNasc,
            nationality: novoNacionalidade
        })

        getAuthor() 
    }

    const attAutor = async () => {
        const response = await api.put(`/author/editar`, {
            id: selectedID,
            name: novoNome,
            birthdate: dataNasc,
            nationality: novoNacionalidade
        })

        getAuthor()
    }


    return(
        
        <div className='FullPage flex-center' style={{backgroundColor:"white", height:"100%", flexDirection:"column"}}>


            <NavBar/>

            <div>
                <h1>Dados de autor</h1>

                <button style={{backgroundColor:"lightgreen"}} onClick={() => handleCriar()}>+ Adicionar Autor</button>

                <table>
                    <thead>
                        <tr>
                            <th className='blackborder'>Id</th>
                            <th className='blackborder'>Nome</th>
                            <th className='blackborder'>Nacionalidade</th>
                            <th className='blackborder'>Data de Nascimento</th>
                            <th className='blackborder'>Excluir</th>
                            <th className='blackborder'>Editar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            authors.map((author, index) => (
                                <tr key={index}>
                                    <td className='blackborder'>{author.id}</td>
                                    <td className='blackborder'>{author.name}</td>
                                    <td className='blackborder'>{author.nationality}</td>
                                    <td className='blackborder'>{new Date(author.birthdate).toLocaleDateString("pt-BR")}</td>
                                    <td className='blackborder'><button style={{backgroundColor:"red"}} onClick={()=>handleExcluir(author)}>Excluir</button></td>
                                    <td className='blackborder'><button style={{backgroundColor:"lightblue"}} onClick={()=>handleEditar(author)}>Editar</button></td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>


            {aba == "excluir" &&
            <div className='flex-center' style={{backgroundColor:"white", width:"auto", height:"20%", position:"absolute", top:420, left:0}}>
                <div className='flex-center' style={{background:"#c22323", width:500, height:500, flexDirection:"column", borderRadius:15}}>
                    <p style={{fontSize:25, fontWeight:"bold"}}>Tem certeza que deseja excluir? {selectedID}</p>
                    <div className='flex-center' style={{flexDirection:"row", width:"100%"}}>
                        <button onClick={deletarAuthor} style={{width:150, marginRight:5}}>Sim</button>
                        <button onClick={() => setAba('')} style={{width:150}}>Nao</button>
                    </div>
                </div>
            </div>
            }

            {aba == "editar" &&
            <div className='flex-center' style={{backgroundColor:"white", width:"auto", height:"20%", position:"absolute", top:420, left:0}}>
                <div className='flex-center' style={{background:"lightblue", width:500, height:500, flexDirection:"column", borderRadius:15, alignItems:"center", justifyContent:"center"}}>
                    <p style={{fontSize:25, fontWeight:"bold"}}>Editar informações</p>
                    <InputNomeado value={novoNome} valor={setNovoNome} titulo="Nome" largura={250}/>
                    <InputNomeado value={novoNacionalidade} valor={setNovoNacionalidade} titulo="Nacionalidade" largura={250} />
                    <InputNomeado value={dataNasc} valor={setDataNasc} titulo="Data de nasc" largura={250} />

                    <button onClick={attAutor}>atualizar</button>
                </div>
            </div>
            }

            {aba == "criar" &&
            <div className='flex-center' style={{backgroundColor:"white", width:"auto", height:"20%", position:"absolute", top:420, left:0}}>
                <div className='flex-center' style={{background:"lightgreen", width:500, height:600, flexDirection:"column", borderRadius:15}}>
                    <p style={{fontSize:25, fontWeight:"bold", color:"black"}}>Criar novo autor</p>
                    <InputNomeado valor={setNovoNome} titulo="Nome" largura={250}/>
                    <InputNomeado valor={setNovoNacionalidade} titulo="Nacionalidade" largura={250} />
                    <InputNomeado valor={setDataNasc} titulo="Data de nasc" largura={250} />
                    <button onClick={criarAutor}>Salvar novo Autor</button>
                </div>
            </div>
            }
            
        </div>

    )
}



