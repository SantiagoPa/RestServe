const { Collection } = require('mongoose');
const { Category, User, Rol, Product } = require('../models');

const isRolValid = async (rol= '') => {

    const existsRol = await Rol.findOne({ rol });
    if (!existsRol) {
        throw new Error(`the rol: ${rol}, is invalid`)
    }
}

const isEmailExists = async (email = '')=>{

    const exitsEmail = await User.findOne({ email });
    if (exitsEmail) {
        throw new Error(`the email: ${email}, it already exists`)
    }
}

const isUserByIdExists = async (id)=>{

    const existsUserById = await User.findById(id);
    if (!existsUserById) {
        throw new Error(`the id: ${id}, not exists`)
    }
}
//=============
// Categories |
//=============

const isCategoryByIdExists = async (id)=>{
    const existsCategoryById = await Category.findById(id);
    if (!existsCategoryById) {
        throw new Error(`the id: ${id}, not exists`);
    }
}

//=============
// Categories |
//=============

const isProductByIdExists = async (id)=>{
    const existsProductById = await Product.findById(id);
    if (!existsProductById) {
        throw new Error(`the id: ${id}, not exists`);
    }
}

//======================
// validate collections|
//======================

const allowedCollections = (collection = '', collections= [])=>{
    const include =  collections.includes(collection);
    if (!include) {
        throw new Error(`the collection: ${collection}, is not allowed, ${collections}`);
    }
    return true;
}

module.exports = {
    isRolValid,
    isEmailExists,
    isUserByIdExists,
    isCategoryByIdExists,
    isProductByIdExists,
    allowedCollections,
}