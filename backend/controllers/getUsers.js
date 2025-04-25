import { db } from '../config/db.js';

export const getUsers = (req, res) => {
    const q = "SELECT * FROM usuarios";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Erro na query:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
}; 