import express from "express";
import userController from "./controllers/userController.js";
import bookController from "./controllers/bookController.js";
import loginController from "./controllers/loginController.js";
import uploadController from "./controllers/uploadController.js";
import authorController from './controllers/authorControle.js'
import {authenticate} from "./utils/jwt.js"

const routes = express();

routes.use("/user", userController);
routes.use("/book", bookController);
routes.use("/login", loginController);
routes.use("/upload", authenticate, uploadController);
routes.use("/author", authorController);

export default routes;

