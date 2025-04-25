import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../controllers';
import '../styles/UserDetails.css';

const UserDetails = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userData = await getUserById(id);
                console.log('Dados do usuário:', userData);
                
                if (userData && userData.success && userData.user) {
                    setUser(userData.user);
                } else {
                    setError('Usuário não encontrado');
                }
                setLoading(false);
            } catch {
                setError('Erro ao carregar detalhes do usuário');
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!user) return <div className="error">Usuário não encontrado</div>;

    return (
        <div className="user-details-container">
            <div className="user-details-card">
                <div className="user-header">
                    <h1>Detalhes do Usuário</h1>
                    <span className="user-id">ID: {user.id}</span>
                </div>
                
                <div className="user-content">
                    <div className="info-group">
                        <label>Nome</label>
                        <div className="info-value">{user.nome || 'Não informado'}</div>
                    </div>
                    
                    <div className="info-group">
                        <label>Trabalho</label>
                        <div className="info-value">{user.trabalho || 'Não informado'}</div>
                    </div>
                    
                    <div className="info-group">
                        <label>Telefone</label>
                        <div className="info-value">{user.telefone || 'Não informado'}</div>
                    </div>

                    <div className="info-group">
                        <label>Cidade</label>
                        <div className="info-value">{user.cidade || 'Não informado'}</div>
                    </div>
                </div>

                <div className="actions-group">
                    <button 
                        className="btn btn-secondary"
                        onClick={() => navigate('/')}
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails; 