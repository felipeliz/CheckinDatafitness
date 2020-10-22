import axios from 'axios';

const api = axios.create({
    baseURL: 'https://checkin-datafitness.com.br/srv/server.php'
});

export default api;