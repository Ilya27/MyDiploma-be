const path = require('path');
const {Files} = require('../../db/models')
const Errors = require('../../core/Errors');

/**
 @api {post} /upload Upload file to server
 @apiGroup Upload

 @apiDescription
 Method should be upload supported file to server</br>

 @apiPermission Providers

 @apiHeaderExample {json} Header-Example:
     {
       "Content-Type": "multipart/form-data",
       "Access-Token": "token"
     }


 @apiSuccessExample Success-Response:

 {
    "fullURL": "http://localhost:3002/4bf9c4b05af724e8c5939de22f1e345f.pdf",
    "fileName": "978-5-7996-1167-5_2014 (2).pdf",
    "size": "7001863",
    "creationDate": 1582219966700,
    "path": "/4bf9c4b05af724e8c5939de22f1e345f.pdf",
    "_id": 11,
    "__v": 0
}

*/

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

module.exports = async function (request, response, next) {
    const config = request.app_config;
    try {
        if (!request.files || !request.files.file) {
            throw new Errors(`No files were uploaded. Make sure you have field with name «file» in your request`, 400);
        }

        let {file} = request.files;

        //CHECK supported file types
        if (!config.media.supportTypes.includes(file.mimetype)) {
            throw new Errors(`Mime type of File doesn't supported!`, 400);
        }

        let ext = path.extname(file.name);
        let newFileName = `${file.md5}${ext}`;
        let directory = path.resolve(config.media.directory);
        let savePath = path.join(directory, newFileName);

        const newFile = await Files.insert({
            fileName: file.name,
            size: file.data.length,
            path: `/${newFileName}`,
        });

        file.mv(savePath, (error) => {
            if (error) {
                error.statusCode = 500;
                return next(error);
            }

            let imageUrl = `${config.media.serverUrl}/${newFileName}`;
            response.json({fullURL: imageUrl, ...newFile.toObject()});
        });

    } catch (error) {
        next(error);
    }
}
