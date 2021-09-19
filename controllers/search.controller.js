const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");

const allowedCollections = [
    'users',
    'categories',
    'category',
    'products',
    'roles'
];

const findUsers = async ( item = '', res=response) =>{
    const isMongoId = ObjectId.isValid( item );
    if (isMongoId) {
        const user = await User.findById( item );
        return res.json({
            results: ( user ) ? [ user ] : []
        });
    }

    const regex = new RegExp( item, 'i' )

    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{estado: true}],
    });
    
    res.json({
        results: users    
    });
}

const findCategories = async ( item = '', res=response) =>{
    const isMongoId = ObjectId.isValid( item );
    if (isMongoId) {
        const category = await Category.findById( item );
        return res.json({
            results: ( category ) ? [ category ] : []
        });
    }

    const regex = new RegExp( item, 'i' )

    const categories = await Category.find({name: regex});
    
    res.json({
        results: categories     
    });
}

const findProducts = async ( item = '', res=response) =>{
    const isMongoId = ObjectId.isValid( item );
    if (isMongoId) {
        const product = await Product.findById( item ).populate('category', 'name');
        return res.json({
            results: ( product ) ? [ product ] : []
        });
    }

    const regex = new RegExp( item, 'i' )

    const products = await Product.find({name: regex, disponible: true, estado: true});
    
    res.json({
        results: products    
    });
}

const findProductByCategory = async ( item = '', res=response) =>{
    const isMongoId = ObjectId.isValid( item );
    if (isMongoId) {
        const products = await Product.find({category: ObjectId(item)}).populate('category', 'name');
        return res.json({
            results: ( products ) ?  products  : []
        });
    }
}


const search = (req, res=response)=>{
    
    const {collection, item} = req.params
    
    if ( !allowedCollections.includes( collection ) ) {
        res.status(400).json({
            msg: `the allowed collections are: ${allowedCollections}`
        })
    }

    switch (collection) {
        case 'users':
            findUsers(item, res);
        break;
        case 'categories':
            findCategories(item, res);
        break;
        case 'category':
            // find by id category
            findProductByCategory(item, res);
        break;
        case 'products':
            findProducts(item, res);
        break;

        default: 
            res.status(500).json({
                msg: 'search has not been implemented'
            })
            
    }
}

module.exports = {
    search
}