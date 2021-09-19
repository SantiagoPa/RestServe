const { response } = require("express");

const { Category } = require('../models');


const categoryGet = async (req, res=response)=>{
    const {limit = 5, skip = 0 } = req.query;
    const query = {estado: true};

    const [total, categories]  = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
        .populate('user', 'name')
        .skip(Number(skip))
        .limit(Number(limit)),
    ]);

    res.json({
        total,
        categories
    });

}


const categoryById = async (req, res=response)=>{
    const { id } = req.params;
    const categoryId = await Category.findById( id )
                                     .populate('user', 'name');
    res.json(categoryId);
}

const createCategory = async (req, res=response)=>{
    const name  = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({name});
    if (categoryDB) {
        return res.status(400).json({
            msg: `the category: ${categoryDB.name}, already exists`
        });
    } 

    //data saved
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category( data );
    
    // saved db
    await category.save();

    res.status(201).json(category);
}


const updateCategory = async(req, res=response)=>{

    const { id } = req.params;
    const { estado, user, ...data} = req.body;
    data.name = data.name.toUpperCase();
    data.user = req.user._id;
    const category = await Category.findByIdAndUpdate(id, data, {new: true})
                                    .populate('user','name');

    res.json(category); 
}



const deleteCategory = async(req, res=response)=>{
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, {estado: false}, {new: true});
    res.json(category);
}


module.exports = {
    categoryGet,
    categoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}