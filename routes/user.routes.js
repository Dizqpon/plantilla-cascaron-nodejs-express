const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password tiene que tener mas de 6 carácteres y por lo menos una mayuscula').isLength({ min: 6 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
    check('email', 'El valor ingresado no tiene la sintaxis de un email').isEmail(),
   // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
   check('role').custom( async (rol = '') =>   {
    const existeRole = await Role.findOne({ rol });
    if (!existeRole) {
        throw new Error(`El rol ${rol} no existe en la base de datos`)
    }  
   }),
    validarCampos
], usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);







module.exports = router;