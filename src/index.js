const path = require('path');
const { getFilePaths, getDicomJsonFiles } = require('./utils');
const nano = require('nano')('http://admin:admin@localhost:5984');


const rootDirectoryPath = path.join(__dirname, '/datasets/dicomFiles');

(() => {
    getFilePaths(rootDirectoryPath, (err, filePaths) => {
        if (err) console.log(err);
        const jsonFiles = getDicomJsonFiles(filePaths);

        nano.db.get('exames', function(err, body) {
            if (err && err.reason === 'Database does not exist.') {
                nano.db.create('exames', (err, body) => {
                    console.log('Database created!');
                });
            } else {
                const exames = nano.use('exames');

                exames.bulk(jsonFiles, (err, body) => {
                    console.log(body)
                })
            }
        });


    });

})();
