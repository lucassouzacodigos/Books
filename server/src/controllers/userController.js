import express from "express";
import User from "../entities/user.js";
import { AppDataSource } from "../database/data-source.js";
import {Like, IsNull} from "typeorm";
import {authenticate} from "../utils/jwt.js";
import profile from "../entities/profile.js";

     const route = express.Router();
     const userRepository = AppDataSource.getRepository(User);
     const profileRepository = AppDataSource.getRepository(profile)

     route.get("/",  async (request, response) => {
          const users = await userRepository.findBy({deletedAt: IsNull()});
          return response.status(200).send({"response":users});
     });

     route.get("/profile", authenticate, async (req,res) => {
          const users = await userRepository.findBy({email: req.user.email})
          const imageProfile = await profileRepository.findOne({
               where: {user: users},
               order: { id: 'DESC'},
          })
          return res.status(200).send({users, imageProfile})
     })

     route.get("/:nameFound", async (request, response) => {
          const {nameFound} = request.params;
          const userFound = await userRepository.findBy({name: Like (`%${nameFound}%`)});
          return response.status(200).send({"response":userFound})
     });

     route.post("/", async (request, response) => {

     const {name, email, password, typeUser} = request.body;


     if (typeUser != "comum" && typeUser != "admin"){
          return response.status(500).send({"response":"Type user cannot be null"})
     }

     try {
          const newUser = userRepository.create({name, email, password, typeUser});
          await userRepository.save(newUser);
          return response.status(201).send({"response":"Usuário cadastrado com sucesso."});
     } catch(err) {
          console.log(err)
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
               await userRepository.update({id}, {name, email, password, typeUser});

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

          await userRepository.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});

          return response.status(200).send({"response": "Usuário removido com sucesso."});

     });


     export default route;
