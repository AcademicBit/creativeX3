import { db } from "../config/db.js";

export const updateUser = (req, res) => {
  const q = "UPDATE usuarios SET nome = ?, trabalho = ?, telefone = ?, cidade = ? WHERE id = ?";
  const values = [req.body.nome, req.body.trabalho, req.body.telefone, req.body.cidade, req.params.id];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Erro ao atualizar usuário:", err);
      return res.status(500).json({
        error: "Erro ao atualizar usuário no banco de dados",
        details: err.message
      });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({
        error: "Usuário não encontrado"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Usuário atualizado com sucesso"
    });
  });
}; 