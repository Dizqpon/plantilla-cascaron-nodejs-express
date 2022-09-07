const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usuariosGet = async (req = request , res = response) => {
    const { limit = 5, desde = 0} = req.query;
    const query = { state: true };
    

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(desde)
            .limit(limit)
    ]);

    res.json({
        total,
        users
    })
};



const usuariosPost = async (req, res = response) => {
    // Desestructurando asi la respuesta, eso es solo que vamos a recibir, si el formulario tiene campos que no son necesarios para
    // la base de datos donde van, solo me quedo con los 4 que he desestructurado.

    const { name, email, password, role }= req.body;
    const user = new User( { name, email, password, role } );

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    // Guardado del usuario en la base de datos
    await user.save();
    res.json({
        user
    })
};

const usuariosPut = async (req, res = response) => {
    const { id }= req.params;

    const { _id, role, password, google, ...resto } = req.body;

    // TODO validar contra la base de datos

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }


    const user = await User.findByIdAndUpdate( id, resto )
    res.json( user );
};

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    
    const user = await User.findByIdAndUpdate(id, {state: false});
    res.json( user );
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Esto es una petición PATCH'
    })
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}