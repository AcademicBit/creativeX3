import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url'
import userRoutes from "./routes/users.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api", userRoutes)

app.use(express.static(path.join(__dirname, 'public')))
app.use('/styles', express.static(path.join(__dirname, 'public/styles')))

app.listen(8800)