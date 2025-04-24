import axios from 'axios';

// Criando uma instância do Axios com configurações base
const api = axios.create({
    baseURL: 'http://localhost:8800/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api; 