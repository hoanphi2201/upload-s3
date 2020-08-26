const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const uploadToS3 = require('./uploadToS3');

const getAllPathInDir = (currentDirPath) => {
    const names = fs.readdirSync(currentDirPath);

    const fileNames = names.map(name => {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);

        if (stat.isFile()) {
            return [filePath];
        } else if (stat.isDirectory()) {
            return getAllPathInDir(filePath);
        }
    }).filter(item => item);

    return [].concat(...fileNames);
};

module.exports = async (dirPath) => {
    const paths = getAllPathInDir(dirPath);

    // Concurrency là số luồng chạy, thay = 2 thì chạy 2 luồng song song.
    await Promise.map(paths, async path => {
        console.log('UPLOADING:', path);

        try {
            const file = fs.readFileSync(path);
            const s3Path = path.replace(new RegExp(dirPath,"g"), '');
            console.log(s3Path)
            const data = await uploadToS3(file, s3Path);
            console.log('DONE:', path);
        } catch (e) {
            console.log(e)
            if (fs.existsSync('errors.txt')) fs.appendFileSync('errors.txt', path + '\n');
            else fs.writeFileSync('errors.txt', path + '\n');
        }
    }, {concurrency: 50});
};
