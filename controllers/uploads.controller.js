const path = require('path');
const fs   = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );   

const { response } = require("express");
const { uploadFileServer } = require("../helpers/upload-file");
const { User, Product } = require("../models");

const uploadFile = async (req, res=response) =>{

    try {
        // textos
        //const name = await uploadFileServer(req.files, ['txt', 'md'], 'texts');
        const name = await uploadFileServer(req.files, undefined, 'imgs');

        res.json({name});

    } catch (msg) {
        res.status(400).json({msg});
    }
}

const updateImg = async (req, res=response)=>{
      
    const {id, collection} = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `these is no user with the id: ${id}`
                });
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `these is no product with the id: ${id}`
                });
            }
        break;
    
        default:
            return res.status(500).json({msg: 'search has not been implemented'})
    }

    // clean previous imgs
    if (model.img) {
        // delete img of server
        const pathImagen = path.join( __dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }


    const name = await uploadFileServer(req.files, undefined, collection);
    model.img = name;

    await model.save();
    res.json(model);

}

const showImagen = async (req, res=response)=>{

    const {id, collection} = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `these is no user with the id: ${id}`
                });
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `these is no product with the id: ${id}`
                });
            }
        break;
    
        default:
            return res.status(500).json({msg: 'search has not been implemented'})
    }

    // clean previous imgs
    if (model.img) {
        // delete img of server
        const pathImagen = path.join( __dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile( pathImagen );
        }
    }
    const pathPlaceholder = path.join( __dirname,'../assets/no-image.jpg');
    return res.sendFile(pathPlaceholder);
}

const updateImgCloudinary = async (req, res=response)=>{
      
    const {id, collection} = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `these is no user with the id: ${id}`
                });
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `these is no product with the id: ${id}`
                });
            }
        break;
    
        default:
            return res.status(500).json({msg: 'search has not been implemented'})
    }

    // clean previous imgs
    if (model.img) {
        const nameArr = model.img.split('/');
        const name    = nameArr [nameArr.length - 1];
        const [public_id] = name.split('.');
         cloudinary.uploader.destroy( public_id );
    }
   
    const { tempFilePath } = req.files.file
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath)

    model.img = secure_url;

    await model.save();
    res.json(model);

}

module.exports = {
    uploadFile,
    updateImg,
    showImagen,
    updateImgCloudinary
}