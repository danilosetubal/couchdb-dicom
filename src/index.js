const path = require('path');
const { getFilesPaths, getDicomJsonFiles } = require('./utils/dicom');
const { verifyDatabase, insertDocuments, createDataBase } = require('./utils/repository');
const rootDirectoryPath = path.join(__dirname, '/datasets/dicomFiles');

const databaseName = 'dicom_db';
const rootDatabasePath = 'http://localhost:5984/' + databaseName;
const postBulkPath = rootDatabasePath + '/_bulk_docs';
const configRequest = {auth: {username: 'admin', password: 'admin'}};

(async () => {
    const filesPaths = await getFilesPaths(rootDirectoryPath);
    const jsonFiles = getDicomJsonFiles(filesPaths);
    const baseExists = await verifyDatabase(rootDatabasePath, configRequest);

    if (baseExists) {
        await insertDocuments(postBulkPath, jsonFiles, configRequest);
    } else {
        await createDataBase(rootDatabasePath, configRequest);
        await insertDocuments(postBulkPath, jsonFiles, configRequest);
    }
})();
