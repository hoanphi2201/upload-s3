const AWS = require('aws-sdk');

const S3_BUCKET = 'luyenthitop2';
const END_POINT = 'https://nyc3.digitaloceanspaces.com';
const S3_ACCESS_KEY = 'RR2MB3MJDZH4DPZRADVZ';
const S3_SECRET_KEY = 'Lcvx0fKNAR9cN6OqP1vhVPmBtPU28pl75kPNZZB67XU';

module.exports = async (file, path) => {
    const s3 = new AWS.S3({
        endpoint: END_POINT,
        accessKeyId: S3_ACCESS_KEY,
        secretAccessKey: S3_SECRET_KEY,
    });

    const params = {
        Bucket: S3_BUCKET,
        Key: path,
        Body: file,
        ACL: 'public-read'
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};
