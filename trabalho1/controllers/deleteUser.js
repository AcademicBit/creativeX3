import { db } from "../db.js";

export const deleteUser = (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        error: "ID do usuário não fornecido"
      });
    }

    const q = "DELETE FROM usuarios WHERE idusuarios = ?";

    db.query(q, [userId], (err, data) => {
      if (err) {
        console.error("Erro ao deletar usuário:", err);
        return res.status(500).json({
          error: "Erro ao deletar usuário no banco de dados",
          details: err.message
        });
      }

      if (data.affectedRows === 0) {
        return res.status(404).json({
          error: "Usuário não encontrado"
        });
      }

      return res.status(200).json({
        message: "Usuário deletado com sucesso!"
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