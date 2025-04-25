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
            console.log('Dados recebidos:', response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
    };

    const handleUserClick = (userId) => {
        navigate(`/usuario/${userId}`);
    };

    return (
        <div className="container" style={{ backgroundColor: '#000', minHeight: '100vh' }}>
            <div className="cards-grid">
                {users.map(user => (
                    <div 
                        key={user.id} 
                        className="user-card"
                        onClick={() => handleUserClick(user.id)}
                        style={{
                            backgroundColor: '#333',
                            borderRadius: '8px',
                            padding: '15px',
                            margin: '10px',
                            width: '200px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, background-color 0.2s',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                backgroundColor: '#444'
                            }
                        }}
                    >
                        <div className="card-content">
                            <h3 style={{ 
                                color: '#ff8c00',
                                marginBottom: '10px',
                                fontSize: '1.2em'
                            }}>ID: {user.id}</h3>
                            <p style={{
                                color: '#fff',
                                margin: 0,
                                fontSize: '1em'
                            }}>{user.nome || 'Não informado'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList; 