
const path = require('path');
const {v4: uuidv4}   = require('uuid');

const uploadFileServer = (files, allowedExtension = ['png', 'jpg', 'jpeg', 'gif'], folder='')=>{

    return new Promise((resolve, reject)=>{

        const { file } = files;
        const shortName = file.name.split('.');
        const extension = shortName[shortName.length - 1];
        
        //validate extension     
        if (!allowedExtension.includes(extension)) {
           return  reject(`the extension: ${ extension}, is not allowed - ${allowedExtension}`);
        }

        const nameTemp = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', folder ,nameTemp);

        file.mv(uploadPath, (err)=>{
            if (err) {
               reject(err);
            }
            resolve(nameTemp);
        });
    });
}

module.exports = {
    uploadFileServer,
}