import express from "express"
import { DeleteUser, GetAllUsers , GetUser , CreateUser, UpdateUser} from './../controllers/userController.js';
export const Routes = express.Router();

Routes.get("/",GetAllUsers);
Routes.get("/:id",GetUser)
Routes.delete("/:id",DeleteUser)
Routes.post("/", CreateUser)
Routes.put("/:id",UpdateUser)