const { request, response } = require('express');


const usersGet = (req, res=response)=>{

    const query = req.query;

    res.json({
        msg: 'get API - userController',
        query
    });
}

const usersPost = (req, res=response)=>{

    const {name , age} = req.body;

    res.json({
        msg: 'Post API -userController',
        name,
        age,
    });
}

const usersPut = (req=request, res=response)=>{
    
    const { id } = req.params;

    res.json({
        msg: 'Put API -userController',
        id
    });
}

const usersPatch = (req, res=response)=>{

    res.json({
        msg: 'Patch API - controller',
     
    });
}

const usersDelete = (req, res=response)=>{
    res.json({
        msg: 'Delete API -userController'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,

}