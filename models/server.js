const express = require('express');
const cors    = require('cors');
const { dbConnection } = require('../database/config.db');
const fileUpload = require('express-fileupload');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth:       '/api/auth',
            categories: '/api/categories',
            users:      '/api/users',
            products:   '/api/products',
            search:     '/api/search',
            uploads:    '/api/uploads'
        }

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

        //FileUpload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir:  '/tmp/',
            createParentPath: true,
        }));
    }

    routes(){
        this.app.use(this.path.auth, require('../routes/auth.routes'));
        this.app.use(this.path.categories, require('../routes/category.routes'));
        this.app.use(this.path.users, require('../routes/user.routes'));
        this.app.use(this.path.products, require('../routes/product.routes'));
        this.app.use(this.path.search, require('../routes/search.routes'));
        this.app.use(this.path.uploads, require('../routes/uploads.routes'));
    }

    listen(){
        
        this.app.listen(this.port, ()=>{
            console.log('server corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;