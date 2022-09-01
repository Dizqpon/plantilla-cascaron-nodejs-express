const cors = require('cors');
const express = require('express');
const router = require('../routes/user.routes');


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Middlewares
        this.middlewares()
        // Rutas de mi aplicación
        this.routes()
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        //PARSEO Y LECTURA DEL BODY
        this.app.use(express.json());

        // Directorio público
        this.app.use( express.static('public') );
        
    }
    
    routes( ) {
        this.app.use( this.usuariosPath, require('../routes/user.routes.js' ))
        
    }

    listen() {
    
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo por el puerto ' + this.port);
        });
    }

}


module.exports = Server;