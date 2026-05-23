import express from "express"
import User from "../entities/user.js"
import Upload from "../entities/profile.js"
import { AppDataSource } from "../database/data-source.js"
import { IsNull } from "typeorm"
import multer from "multer"
import cloudinary from "../helpers/cloudinary.js"
import fs from "fs"

const route = express.Router()

const userRepository = AppDataSource.getRepository(User)
const uploadRepository = AppDataSource.getRepository(Upload)

const upload = multer({ dest: "./src/upload/" })

route.post("/", upload.single("uploads"), async (request, response) => {
    try {

        if (!request.file) {
            return response.status(400).json({
                error: "Imagem não enviada"
            })
        }

        // ⚠️ TROCA IMPORTANTE:
        // antes: request.user.email (quebrava se não tiver auth)
        const email = request.body.email

        if (!email) {
            return response.status(400).json({
                error: "Email não enviado"
            })
        }

        const user = await userRepository.findOneBy({
            email,
            deletedAt: IsNull()
        })

        if (!user) {
            return response.status(404).json({
                error: "Usuário não encontrado"
            })
        }

        // upload cloudinary
        const result = await cloudinary.uploader.upload(request.file.path)

        const urlUpload = result.secure_url

        // salva no banco
        const profile = uploadRepository.create({
            url_photo_profile: urlUpload,
            user
        })

        await uploadRepository.save(profile)

        // remove arquivo local
        fs.unlinkSync(request.file.path)

        return response.json({
            message: "Imagem salva com sucesso!",
            urlUpload
        })

    } catch (error) {
        console.error(error)

        return response.status(500).json({
            error: "Erro ao fazer upload para o Cloudinary"
        })
    }
})

export default route