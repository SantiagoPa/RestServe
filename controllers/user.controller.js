const { request, response } = require('express');
const bycripjs = require('bcryptjs');


const User = require('../models/user');

const usersGet = async (req, res=response)=>{

    const {limit = 5, skip = 0 } = req.query;
    const query = {estado: true};

    const [total, users]  = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(skip))
        .limit(Number(limit)),
    ]); 

    res.json({
        total,
        users,
    });
}

const usersPost = async (req, res=response)=>{

    const { name, email, password, rol } = req.body;
    const user = new User( {name, email, password, rol} );

    // bycript password
    const salt = bycripjs.genSaltSync();
    user.password = bycripjs.hashSync( password , salt );

    //save in db
    await user.save();

    res.json({
        user,
    });
}

const usersPut = async (req=request, res=response)=>{
    
    const { id } = req.params;
    const { _id ,password, google, email, ...rest} = req.body;

    //TODO validate in db
    if( password ) {
     // bycript password
        const salt = bycripjs.genSaltSync();
        rest.password = bycripjs.hashSync( password , salt );
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json(user);
}

const usersDelete = async (req, res=response)=>{
    const { id } = req.params;

    //delete Collection
    //const user = await User.findByIdAndDelete(id);
    
    const user = await User.findByIdAndUpdate(id, {estado: false});
    res.json(user);
}

const usersPatch = (req, res=response)=>{

    res.json({
        msg: 'Patch API - controller',
    });
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,

}