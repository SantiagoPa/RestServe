
const {Schema , model} = require('mongoose');

const productSchema = Schema({
    
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
    },

    price: {
        type: Number,
        default: 0,

    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: {type: String},
    disponible: {type: Boolean, default: true},
    img:{type: String}
    

});

productSchema.methods.toJSON = function(){
    const { __v, estado, ...category } = this.toObject();
    return category;    
}   
module.exports = model('Product', productSchema);