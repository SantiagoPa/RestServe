const express = require('express');
const cors    = require('cors');
const { dbConnection } = require('../database/config.db');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath  = '/api/auth';

        // database connect
        this.databaseConnect();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async databaseConnect(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        // read body json
        this.app.use( express.json() );

        //Dir public
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth.routes'));
       this.app.use(this.usersPath, require('../routes/user.routes'));
    }

    listen(){
        
        this.app.listen(this.port, ()=>{
            console.log('server corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;