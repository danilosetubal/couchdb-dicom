const { request } = require('./request');

const insertDocuments = (dataBasePath, jsonFiles, configRequest = {}) => {
    return request.post(dataBasePath, {docs: jsonFiles}, configRequest)
        .then(res => {
            console.log('Total de documentos:', jsonFiles.length);
            console.log('Total armazenado com sucesso:', res.data.length);
            return res
        })
        .catch(err => {
            console.log('Erro ao incluir documentos: ', err.message);
            throw err.stack;
        })
};

const createDataBase = (dataBasePath, configRequest = {}) => {
    return request.put(dataBasePath, {}, configRequest)
        .then(res => {
            console.log('Base de dados criada com sucesso: ', 'dbName');
            return res;
        })
        .catch(err => {
            console.log('Erro ao criar a base de dados.', err);
            throw err;
        })
};

const verifyDatabase = (dataBasePath, configRequest = {}) => {
    return request.get(dataBasePath, configRequest)
        .then(res => res.status === 200)
        .catch(() => false)
};

module.exports = {
    insertDocuments,
    createDataBase,
    verifyDatabase
};