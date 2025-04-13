import express from "express"
import userRoutes from "./Routes/users.js"
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

app.use("/", userRoutes)

app.listen(8800)