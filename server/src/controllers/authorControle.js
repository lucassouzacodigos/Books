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


export default route