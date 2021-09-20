const {Router} = require('express');
const { check } = require('express-validator');

const { uploadFile,
        updateImg,
        showImagen,
        updateImgCloudinary} = require('../controllers/uploads.controller');

const { validateFields, validateUploadFile } = require('../middleware');
const { allowedCollections } = require('../helpers');


const router = Router();

router.post( '/' , validateUploadFile ,uploadFile);

router.put('/:collection/:id', [
    validateUploadFile,
    check('id', 'the id is invalid').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'] ) ),
    validateFields
],updateImgCloudinary); 
//updateImg);

router.get('/:collection/:id', [
    check('id', 'the id is invalid').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'] ) ),
    validateFields
], showImagen);

module.exports = router;