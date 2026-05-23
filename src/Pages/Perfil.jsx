import { useState } from 'react'
import '../App.css'
import NavBar from '../Components/NavBar'
import { TextField, Select, MenuItem } from '@mui/material'

export default function Perfil() {

    const [tipoUsuario, setTipoUsuario] = useState('')
    const [imagePreview, setImagePreview] = useState(null)

    async function handlePhoto(e) {
        const file = e.target.files[0]

        if (!file) return

        // preview local
        setImagePreview(URL.createObjectURL(file))

        // upload para backend
        const formData = new FormData()
        formData.append("uploads", file) // TEM que ser igual ao backend

        try {
            await fetch("http://localhost:3000/profile", {
                method: "POST",
                body: formData
            })
        } catch (error) {
            console.log("Erro ao enviar imagem:", error)
        }
    }

    return (
        <div
            className='FullPage flex-center'
            style={{
                backgroundColor: "white",
                height: "100%",
                flexDirection: "column"
            }}
        >

            <NavBar />

            {/* FOTO PERFIL */}
            <label style={{ cursor: "pointer" }}>

                <img
                    src={
                        imagePreview ||
                        "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg"
                    }
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        objectFit: "cover",
                        backgroundColor: "red"
                    }}
                />

                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handlePhoto}
                />
            </label>

            {/* CAMPOS */}
            <TextField sx={{ margin: 2 }} label="E-Mail" />
            <TextField sx={{ margin: 2 }} label="Senha" />
            <TextField sx={{ margin: 2 }} label="Nome do usuário" />

            {/* SELECT */}
            <Select
                value={tipoUsuario}
                onChange={(e) => setTipoUsuario(e.target.value)}
                sx={{ width: 200, margin: 2 }}
                displayEmpty
            >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"usuario"}>Usuário Comum</MenuItem>
            </Select>

        </div>
    )
}