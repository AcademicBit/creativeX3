import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/index.js";

const router = express.Router()

router.get("/usuarios", getUsers)
router.get("/usuarios/:id", getUserById)
router.post("/usuarios", createUser)
router.put("/usuarios/:id", updateUser)
router.delete("/usuarios/:id", deleteUser)

export default router