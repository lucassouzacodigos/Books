import "reflect-metadata";
import { DataSource } from "typeorm";
import User from '../entities/user.js'
import Author from '../entities/author.js'
import Book from '../entities/book.js'
import BookAuthor from '../entities/bookAuthor.js'
import Category from '../entities/category.js'
import editor from "../entities/editor.js";
import profile from "../entities/profile.js";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    port: 3306,
    password: "etecembu@123",
    database: "livraria2025_1",
    entities: [User, Author, Book, BookAuthor, Category, editor, profile],
    migrations: ["src/database/migrations/*.cjs"]
});

export {AppDataSource};