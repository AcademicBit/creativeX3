import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "02051964",
    database: "trabalho1"
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar:", err);
        return;
    }
    console.log("Conectado ao banco!");
}); 