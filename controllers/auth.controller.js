const { response} = require('express');
const bcryptjs   = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req,res=response)=>{
    
    const {email, password} = req.body;
    
    try {

        //verificar si el email existe
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'email / password inavlid - email'
            });
        } 
        //verificar el estado del usuario
        if (!user.estado) {
            return res.status(400).json({
                msg: 'email / password inavlid - estado: false'
            });
        } 

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if (!validPassword) {
            return res.status(400).json({
                msg: 'email / password inavlid - password'
            });
        }

        //generar el jwt
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'something went wrong, talk to the admin'
        });
    }

}

const googleSignIn = async (req, res=response)=>{

    const { id_token } = req.body;
    
    try {
        const {email, name, img} = await googleVerify(id_token);    
        
        let user = await User.findOne({email});
        if (!user) {
            //create user
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true

            };
            user = new User(data);
            await user.save();
        }

        // esatdo en db
        if (!user.estado) {
            return res.status(401).json({
                msg: 'talk to admin, user locked'
            });
        }

        //generate jwt
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });

    } catch (error) {

        res.status(400).json({
            msg: 'invalid token by google'
        });
    }
}

module.exports = {
    login,
    googleSignIn,
}
