const cors = require('cors');
const express = require('express');
const { dbConnection } = require('../database/config.db.js');
const router = require('../routes/user.routes');


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares()

        // Rutas de mi aplicación
        this.routes()
    }

    async conectarDB () {
        await dbConnection();
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