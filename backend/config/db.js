import mysql from "mysql";
import dotenv  from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar:", err);
        return;
    }
    console.log("Conectado ao banco!");
}); 