import mysql from "mysql";

// Gera e exporta uma conexão com o DB
export const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "02051964",
    database: "api_db"
});