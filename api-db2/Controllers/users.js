import { db } from "../db.js";

// Adiciona uma conexão de SELECT de usuários
export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

// Obtém um usuário específico pelo ID
export const getUserById = (req, res) => {
  const q = "SELECT * FROM usuarios WHERE idusuarios = ?";
  const userId = req.params.id;

  // Valida se o ID foi fornecido
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

// Cria um novo usuário
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

// Deleta um usuário
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

// Atualiza um usuário
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