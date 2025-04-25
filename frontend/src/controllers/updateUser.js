import api from '../config/api';

export const updateUser = async (userId, userData) => {
    try {
        const response = await api.put(`/usuarios/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
}; 