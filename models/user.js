const {Schema, model } = require('mongoose');

const userSchema = Schema({
    name:{
        type: String,
        required: [true, 'the name is required']
    },

    email:{
        type: String,
        required: [true, 'the email is required'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'the password is required']
    },
    img: {
        type: String
    },
    rol:{
        type: String,
        required: [true, 'the rol is required'],
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true,
    },
    google:{
        type: Boolean,
        default: false
    }

});

userSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject();
    return user;    
}

module.exports = model( 'User', userSchema );