const express = require('express');
const cors    = require('cors');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users'
        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
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
       this.app.use(this.usersPath, require('../routes/user.routes'));
    }

    listen(){
        
        this.app.listen(this.port, ()=>{
            console.log('server corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;