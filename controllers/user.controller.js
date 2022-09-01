const { response } = require('express');

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

const usuariosPost = (req, res = response) => {
    // Desestructurando asi la respuesta, eso es solo que vamos a recibir, si el formulario tiene campos que no son necesarios para
    // la base de datos donde van, solo me quedo con los 4 que he desestructurado.
    const { nombre, edad, programador, telefono } = req.body;
    res.json({
        msg: 'Esto es una petición POST',
        nombre,
        edad,
        programador,
        telefono
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