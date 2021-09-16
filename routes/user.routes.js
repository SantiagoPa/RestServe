const {Router} = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middleware/validate-fields');
const { isRolValid,
        isEmailExists,
        isUserByIdExists } = require('../helpers/db-validators');

const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/user.controller');

const router = Router();


router.get('/', usersGet);

router.post('/', [
    check('name', 'the name is required').not().isEmpty(),
    check('password', 'min 6 letters').isLength({min:6}),
    check('email', 'the email is not valid').isEmail(),
    check('email').custom( isEmailExists ),
    /* check('rol', 'invalid rol').isIn(['ADMIN_ROLE', 'USER_ROLE']), */
    check('rol').custom( isRolValid ),
    validateFields
] ,usersPost);

router.put('/:id',[
    check('id', 'invalid id').isMongoId(),
    check('id').custom( isUserByIdExists ),
    check('rol').custom( isRolValid ),
    validateFields,
],usersPut);

router.delete('/:id',[
    check('id', 'invalid id').isMongoId(),
    check('id').custom( isUserByIdExists ),
    validateFields,
], usersDelete);

router.patch('/', usersPatch);



module.exports = router;