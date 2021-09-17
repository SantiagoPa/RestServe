
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req=request, res=response, next)=>{

    const token = req.header('mytoken');

    if (!token) {
        return res.status(401).json({
            msg: 'there is no token in the request'
        });
    }

    try {

       const {uid} =  jwt.verify(token, process.env.SECRETORPRIVATEKEY);

       //leer usuario autenticado
        const userAuth = await User.findById(uid);

        if (!userAuth) {
            return res.status(401).json({
                msg: 'invalid token - not exists user'
            });
        }

        //verify status
        if (!userAuth.estado) {
            return res.status(401).json({
                msg: 'invalid token - estado: false'
            });
        }

        req.user = userAuth;
  
       next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'invalid token'
        });
    }
}

module.exports = {
    validateJWT,
}