const axios = require('axios');

const customAxios = axios.create({ timeout: 60000 });
const request = {
    get: (url, config = {}) => customAxios.get(url, config),
    post: (url, payload, config = {}) => customAxios.post(url, payload, config),
    delete: url => customAxios.delete(url),
    put: (url, payload, config = {}) => customAxios.put(url, payload, config),
};

module.exports = {
    request
};
