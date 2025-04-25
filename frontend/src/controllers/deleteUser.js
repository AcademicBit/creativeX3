import api from '../config/api';

export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`/usuarios/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw error;
    }
}; 