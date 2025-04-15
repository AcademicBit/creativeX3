import { db } from "../db.js";

export const updateUser = (req, res) => {
  try {
    const userId = req.params.id;
    const { nome, telefone, cpf } = req.body;

    if (!userId) {
      return res.status(400).json({
        error: "ID do usuário não fornecido"
      });
    }

    if (!nome || !cpf) {
      return res.status(400).json({
        error: "Nome e CPF são obrigatórios"
      });
    }

    const q = "UPDATE usuarios SET nome = ?, telefone = ?, cpf = ? WHERE idusuarios = ?";

    db.query(q, [nome, telefone, cpf, userId], (err, data) => {
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
        message: "Usuário atualizado com sucesso!"
      });
    });
  } catch (error) {
    console.error("Erro não tratado:", error);
    return res.status(500).json({
      error: "Erro interno do servidor",
      details: error.message
    });
  }
}; 