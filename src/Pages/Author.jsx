import { useEffect, useState } from 'react'
import '../App.css'
import NavBar from '../Components/NavBar'
import api from '../services/api'



export default function Author(){

    const [authors, setAuthors] = useState([])
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
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
        getAuthor()
    },[])

    if(loading) return <h1>Carregando...</h1>
    if(error) return <h1>{error}</h1>




    return(
        
        <div className='FullPage flex-center'>
            <NavBar/>

            <div>
                <h1>Dados de autor</h1>

                <table>
                    <thead>
                        <tr>
                            <th className='blackborder'>Id</th>
                            <th className='blackborder'>Nome</th>
                            <th className='blackborder'>Nacionalidade</th>
                            <th className='blackborder'>Data de Nascimento</th>
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

                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}



