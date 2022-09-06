const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { validarCampos } = require('../middlewares/validar-campos');

const usuariosGet = (req, res = response) => {

    const { nombre, apikey } = req.query;
    res.json({
        msg: 'Esto es una petición GET',
        nombre,
        apikey
    })
};

const usuariosPut = (req, res = response) => {
    const { id }= req.params;
    res.json({
        msg: 'Esto es una petición PUT',
        id
    })
};

const usuariosPost = async (req, res = response) => {
    // Desestructurando asi la respuesta, eso es solo que vamos a recibir, si el formulario tiene campos que no son necesarios para
    // la base de datos donde van, solo me quedo con los 4 que he desestructurado.

    const { name, email, password, role }= req.body;
    const user = new User( { name, email, password, role } );

    // Verificar si el correo existe
    const existeEmail = await User.findOne( { email } );
   if (existeEmail) {
        return res.status(400).json({
            msg: 'Ese correo ya está reguistrado'
        });
   }


    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    // Guardado del usuario en la base de datos
    await user.save();
    res.json({
        user
    })
};

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Esto es una petición DELETE'
    })
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