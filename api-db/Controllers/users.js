import { db } from "../db.js";

// Adiciona uma conexão de SELECT de usuários
export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};