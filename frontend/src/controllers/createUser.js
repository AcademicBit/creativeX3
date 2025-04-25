import api from '../config/api';

export const createUser = async (userData) => {
    try {
        const response = await api.post('/usuarios', userData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}; 