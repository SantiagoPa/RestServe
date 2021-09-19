
const {Schema , model} = require('mongoose');

const categorySchema = Schema({
    
    name:{
        type: String,
        require: [true, 'the name is required'],
        unique: true
    },

    estado: {
        type: Boolean,
        default: true,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

categorySchema.methods.toJSON = function(){
    const { __v, estado, ...category } = this.toObject();
    return category;    
}   
module.exports = model('Category', categorySchema);