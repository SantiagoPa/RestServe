const { response } = require("express")


const isAdminRol = (req, res=response, next)=>{

    if (!req.user) {
        return res.status(500).json({
            msg: 'verify rol dont verify token'
        });
    }

    const { rol , name } = req.user;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} it's not admin`
        });
    } 

    next();

}

const hasRole = ( ...roles ) => {

    return (req, res=response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'verify rol dont verify token'
            });
        }

        if (!roles.includes( req.user.rol )) {
            return res.status(401).json({
                msg: `the service requires one of these roles: ${roles}`
            });
        }
        
        next();
    }
}

module.exports = {
    isAdminRol,
    hasRole,
}