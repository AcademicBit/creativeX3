import { db } from "../db.js";

export const getUserById = (req, res) => {
  const q = "SELECT * FROM usuarios WHERE idusuarios = ?";
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({
      error: "ID do usuário não fornecido"
    });
  }

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error("Erro ao buscar usuário:", err);
      return res.status(500).json({
        error: "Erro ao buscar usuário no banco de dados",
        details: err.message
      });
    }

    if (data.length === 0) {
      return res.status(404).json({
        error: "Usuário não encontrado"
      });
    }

    return res.status(200).json({
      success: true,
      user: data[0]
    });
  });
}; 