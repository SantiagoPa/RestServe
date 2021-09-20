
const validateFields = require('../middleware/validate-fields');
const validateJWT    = require('../middleware/validate-jwt');
const validateRoles  = require('../middleware/validate-rols');
const validateUploadFile = require('../middleware/validate-file');
module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateUploadFile,
}