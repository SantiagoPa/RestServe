
const {Schema , model} = require('mongoose');

const rolSchema = Schema({
    rol:{
        type: String,
        require: [true, 'the rol is required'],
    }
});

module.exports = model('Rol', rolSchema);