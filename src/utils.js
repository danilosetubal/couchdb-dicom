const fs = require('fs');
const path = require('path');
const dicomParser = require('dicom-parser');
const dictionary = require('./dicomDictionary');

const getFilePaths = function(dir, done) {
    let results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        let i = 0;
        (function next() {
            let file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    getFilePaths(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

const getDicomJsonFiles = filePaths => {
    const files = [];
    filePaths.forEach(filePath => {
        var dicomFileAsBuffer = fs.readFileSync(filePath);

        try {
            var dataSetFile = dicomParser.parseDicom(dicomFileAsBuffer);

            const fileElements = Object.values(dataSetFile.elements);
            const result = {};

            fileElements.map((e, i) => {
                const tag = e.tag.substring(1);
                const key = getFieldFromDictionary(tag);
                const value = dataSetFile.string(e.tag);
                if (key) {
                    result[key] = value;
                }
            });

            files.push(result);
        } catch (e) {
            console.error(e);
        }
    })
    return files;
};

const getFieldFromDictionary = tag => {
    let nameField = null;
    const temp = dictionary.dic[tag];

    if (temp !== undefined) {
        nameField = dictionary.dic[tag].name;
        return nameField;
    } else {
        return null;
    }
};

module.exports = {
    getFilePaths,
    getDicomJsonFiles
};