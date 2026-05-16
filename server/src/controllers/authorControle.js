import express from "express";
import Book from "../entities/book.js";
import Category from "../entities/category.js";
import Editor from "../entities/editor.js";
import { AppDataSource } from "../database/data-source.js";
import {Like, IsNull} from "typeorm";
import author from "../entities/author.js";

const route = express.Router();

const authorRepository = AppDataSource.getRepository(author)

route.get("/", async (req, res) => {
    const allAuthors = await authorRepository.find()
    res.json({"response": allAuthors})
})

route.delete("/delete/:id", async (req,res) => {
    const {id} = req.params

    authorRepository.delete({id: id})
})

route.post("/adicionar", async (req,res) => {
    const {name, birthdate, nationality} = req.body

    const autor = authorRepository.create({name, birthdate, nationality})
    await authorRepository.save(autor)

    res.json({"response": "Autor salvo"})
})

route.put("/editar",async  (req,res) => {
    const {name, birthdate, nationality, id} = req.body

    const attautor = authorRepository.create({name, birthdate, nationality})
    await authorRepository.update({id}, attautor)

    res.json({"response": "Edicao salva"})
})


export default route