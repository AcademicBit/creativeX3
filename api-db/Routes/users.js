import express from "express";
import { getUsers } from "../Controllers/users.js";

const router = express.Router()

router.get("/usuarios", getUsers)

export default router