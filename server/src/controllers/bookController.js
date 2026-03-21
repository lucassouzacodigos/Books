import express from "express";
import Book from "../entities/book.js";
import Category from "../entities/category.js";
import Editor from "../entities/editor.js";
import { AppDataSource } from "../database/data-source.js";
import {Like, IsNull} from "typeorm";

const route = express.Router();

const bookRepository = AppDataSource.getRepository(Book);
const categoryRepository = AppDataSource.getRepository(Category);
const editorRepository = AppDataSource.getRepository(Editor);

route.post("/", async (request, response) => {
   const {book_name, publication, pages, price, editorId, categoryId} = request.body;

   if(book_name.length < 1) {
    return response.status(400).send({"response": "Campo 'book_name' deve ter pelo menos um caractere."});
   }

   try {
     const editor = await editorRepository.findOneBy({
          id:editorId, 
          deletedAt: IsNull()
     });

     if(!editor) {
          return response.status(400).send({"response":"Editora informada não encontrada."});
     }

     const category = await categoryRepository.findOneBy({
          id:categoryId, 
          deletedAt: IsNull()
     });

     if(!category) {
          return response.status(400).send({"response":"Categoria informada não encontrada."});
     }

     const newBook = bookRepository.create({book_name, publication, pages, price, editor, category});
     await bookRepository.save(newBook);
     return response.status(201).send({"response":"Livro cadastrado com sucesso."});
   } catch(err) {
     return response.status(500).send({"response": err});
   }
});

route.put("/", async(request, response) => {
     const {id, name, email, password, typeUser} = request.body;

     if(typeof id != "number") {
          return response.status(400).send({"respose": "O campo 'id' precisa ser numérico"});
     }

     if(name.length < 1) {
          return response.status(400).send({"response": "Campo 'name' deve ter pelo menos um caractere."});
     }
     
     if(!email.includes("@")){
          return response.status(400).send({"response": "Campo 'email' está no padrão incorreto."});
     }
     
     if(password.length < 6){
          return response.status(400).send({"response": "A senha deve conter pelo menos 6 caracteres."})
     }
     
     if(typeUser.toLowerCase() != "admin" && typeUser.toLowerCase() != "comum"){
          return response.status(400).send({"response": 'O tipo de usuário deve ser "admin" ou "comum".'})
     }

     try{
          await bookRepository.update({id}, {name, email, password, typeUser});

          return response.status(200).send({"response":"Usuário atualizado com sucesso."});
     } catch(err) {
          return response.status(500).send({"error": err});
     }
});

route.delete('/:id', async (request, response) => {
     const {id} = request.params;

     if(isNaN(id)) {
          return response.status(400).send({"response": "O id precisa ser numérico"});
     }

     await bookRepository.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});

     return response.status(200).send({"response": "Usuário removido com sucesso."});

});

route.get("/", async (request, response) => {
     const users = await bookRepository.findBy({deletedAt: IsNull()});
     return response.status(200).send({"response":users});
});

route.get("/:nameFound", async (request, response) => {
     const {nameFound} = request.params;
     const userFound = await bookRepository.findBy({name: Like (`%${nameFound}%`)});
     return response.status(200).send({"response":userFound})
});


export default route;
