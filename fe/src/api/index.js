import axios from 'axios';

const TOKEN = '7bf2b13020e1ed2278db4bba3f5e7a53102cbc37';
const option = {
    headers: {
        'Authorization': `token ${TOKEN}`
    }
};
const api = url => axios
    .get(url, option)
    .then(response => response.data);

export default api;
