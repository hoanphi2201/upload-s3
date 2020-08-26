require('dotenv').config();
const uploadDir = require('./uploadDir');

setImmediate(async () => {
    const uploaded = await uploadDir("/Users/PhiXuanHoan/Downloads/dvhbook/");
    console.log('---------------------------UPLOAD DONE---------------------------')
});
