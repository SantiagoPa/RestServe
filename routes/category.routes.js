const {Router} = require('express');
const { check } = require('express-validator');

const { isCategoryByIdExists } = require('../helpers/db-validators');
const { validateFields, validateJWT } = require('../middleware');

const { createCategory,
        categoryGet, 
        categoryById,
        updateCategory,
        deleteCategory} = require('../controllers/category.controller');

const router = Router();

router.get('/', categoryGet);

router.get('/:id', [
    check('id', 'the id is invalid').isMongoId(),
    check('id').custom( isCategoryByIdExists ),
    validateFields,
] , categoryById);

//create categorie 
router.post('/',[
    validateJWT,
    check('name', 'the name is required').not().isEmpty(),
    validateFields,
] , createCategory);

router.put('/:id', [
    validateJWT,
    check('name', 'tha name is required').not().isEmpty(),
    check('id', 'the id is invalid').isMongoId(),
    check('id').custom( isCategoryByIdExists ),
    validateFields
] , updateCategory);

// admin delete
router.delete('/:id', [
    check('id', 'the id is invalid').isMongoId(),
    check('id').custom( isCategoryByIdExists ),
    validateFields
] ,deleteCategory);




module.exports = router;