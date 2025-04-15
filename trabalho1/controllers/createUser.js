import { db } from "../db.js";

export const createUser = (req, res) => {
  try {
    console.log('1. Iniciando createUser');
    const q = "INSERT INTO usuarios (nome, telefone, cpf) VALUES (?, ?, ?)";
    
    console.log('2. Body recebido:', req.body);
    const { nome, telefone, cpf } = req.body;
    
    console.log('3. Dados extraídos:', { nome, telefone, cpf });

    if (!nome || !cpf) {
      console.log('4. Campos obrigatórios faltando:', { nome: !nome, cpf: !cpf });
      return res.status(400).json({
        error: "Nome e CPF são obrigatórios!"
      });
    }

    console.log('5. Iniciando query no banco');
    db.query(q, [nome, telefone || null, cpf], (err, data) => {
      if (err) {
        console.error('6. Erro MySQL:', err);
        return res.status(500).json({
          error: "Erro ao criar usuário no banco de dados",
          details: err.message,
          sqlMessage: err.sqlMessage
        });
      }
      
      if (!data || data.affectedRows === 0) {
        console.log('7. Nenhuma linha afetada');
        return res.status(400).json({
          error: "Não foi possível criar o usuário"
        });
      }

      console.log('8. Usuário criado com sucesso:', data);
      return res.status(201).json({
        message: "Usuário criado com sucesso!",
        id: data.insertId
      });
    });
  } catch (error) {
    console.error('Erro não tratado:', error);
    return res.status(500).json({
      error: "Erro interno do servidor",
      details: error.message
    });
  }
}; 