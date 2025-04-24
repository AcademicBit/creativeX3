import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8800/usuarios');
            console.log('Dados recebidos:', response.data); // Debug
            setUsers(response.data);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
    };

    const handleUserClick = (userId) => {
        navigate(`/usuario/${userId}`);
    };

    return (
        <div className="container">
            <div className="cards-grid">
                {users.map(user => (
                    <div 
                        key={user.idusuarios} 
                        className="user-card"
                        onClick={() => handleUserClick(user.idusuarios)}
                    >
                        <div className="card-content">
                            <h3>ID: {user.idusuarios}</h3>
                            <p><strong>Nome:</strong> {user.nome || 'Não informado'}</p>
                            <p><strong>CPF:</strong> {user.cpf || 'Não informado'}</p>
                            <p><strong>Telefone:</strong> {user.telefone || 'Não informado'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList; 