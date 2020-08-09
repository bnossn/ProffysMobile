import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.10:3333' // Não usar localhost, pois será acessado pelo celular. Usar ip do servidor.
})

export default api;