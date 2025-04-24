import express from "express";
import cors from "cors";
import { getUsers } from "./controllers/getUsers.js";
import { getUserById } from "./controllers/getUserById.js";
import { createUser } from "./controllers/createUser.js";
import { updateUser } from "./controllers/updateUser.js";
import { deleteUser } from "./controllers/deleteUser.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.get("/usuarios", getUsers);
app.get("/usuarios/:id", getUserById);
app.post("/usuarios", createUser);
app.put("/usuarios/:id", updateUser);
app.delete("/usuarios/:id", deleteUser);

app.listen(8800, () => {
    console.log("API rodando na porta 8800");
}); 