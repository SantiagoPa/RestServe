const {Router} = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, isAdminRol } = require('../middleware');
const { isProductByIdExists, isCategoryByIdExists } = require('../helpers/db-validators');

const { productGetById,
        productGet,
        createProduct,
        updateProduct,
        deleteProduct } = require('../controllers/product.controller');

const router = Router();

router.get('/', productGet);

router.get('/:id', [
    check('id', 'the id is invalid').isMongoId(),
    check('id').custom( isProductByIdExists ),
    validateFields
] ,productGetById);

router.post('/', [
    validateJWT,
    check('name', 'the name is required').not().isEmpty(),
    check('category', 'the id of category is inavlid').isMongoId(),
    check('category').custom ( isCategoryByIdExists ),
    validateFields,
] ,createProduct);

router.put('/:id', [
    validateJWT,
    check('id').custom( isProductByIdExists ),
    validateFields
] ,updateProduct);

router.delete('/:id', [
    validateJWT,
    isAdminRol,
    check('id', 'the id is inavlid').isMongoId(),
    check('id').custom( isProductByIdExists ),
] ,deleteProduct); 

module.exports = router;
