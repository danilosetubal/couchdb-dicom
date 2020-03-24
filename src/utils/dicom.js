const fs = require('fs');
const dicomParser = require('dicom-parser');
const globby = require('globby');
const dictionary = require('../dicomDictionary');

const getFilesPaths = dir => globby(`${dir}/**/*.dcm`);

const getDicomJsonFiles = filePaths => {
    const files = [];
    filePaths.forEach((filePath, index) => {
        console.log('Gerando JSON do arquivo:', index + 1, filePath);
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
    });
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
    getFilesPaths,
    getDicomJsonFiles,
};