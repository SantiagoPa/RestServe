const { response } = require("express");
const { Product } = require("../models");

const productGet = async (req, res=response)=>{
    const {limit = 5, skip = 0 } = req.query;
    const query = {estado: true};

    const [total, products]  = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .populate('user', 'name')
        .populate('category', 'name')
        .skip(Number(skip))
        .limit(Number(limit)),
    ]);

    res.json({
        total,
        products
    });
}

const productGetById = async (req, res=response)=>{
    const { id } = req.params;
    const productId = await Product.findById( id )
                                     .populate('user', 'name')
                                     .populate('category', 'name');
    res.json(productId);
}

const createProduct = async (req, res=response)=>{

    const { estado, user, ...body } = req.body;
    const productDB = await Product.findOne({ name: body.name });

    if (productDB) {
        return res.status(400).json({
            msg: `the product: ${productDB.name}, already exists`
        });
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id,
    }

    const product = new Product( data );
    await product.save();
    res.status(201).json(product);
}

const updateProduct = async (req,res=response)=>{
    const { id } = req.params;
    const { estado, user, ...data} = req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;
    const product = await Product.findByIdAndUpdate(id, data, {new: true})
                                    .populate('user','name');

    res.json(product);
}

const deleteProduct = async (req, res=response)=>{
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(product);
}

module.exports = {
    productGet,
    productGetById,
    createProduct,
    updateProduct,
    deleteProduct,
}