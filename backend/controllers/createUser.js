import { db } from "../config/db.js";

export const createUser = (req, res) => {
  const q = "INSERT INTO usuarios (nome, trabalho, telefone, cidade) VALUES (?, ?, ?, ?)";
  const values = [req.body.nome, req.body.trabalho, req.body.telefone, req.body.cidade];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Erro ao criar usuário:", err);
      return res.status(500).json({
        error: "Erro ao criar usuário no banco de dados",
        details: err.message
      });
    }

    return res.status(201).json({
      success: true,
      message: "Usuário criado com sucesso",
      userId: data.insertId
    });
  });
}; 