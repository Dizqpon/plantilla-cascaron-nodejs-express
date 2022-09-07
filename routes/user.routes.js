const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user.controller');
const { esRolValido, emailExiste, idExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id', 'Este id no corresponde a ningun usuario de nuestra base de datos').custom( idExiste ),
    //Aquí el profesor chequea si es un rol valido pero yo prefiero caparle al usuario que no pueda cambiar el rol y si hay que cambiarlo que solo lo pueda cambiar yo
    //check('role').custom( esRolValido ),
    validarCampos
] , usuariosPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password tiene que tener mas de 6 carácteres y por lo menos una mayuscula').isLength({ min: 6 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
    check('email', 'El valor ingresado no tiene la sintaxis de un email').isEmail(),
    check('email').custom( emailExiste ),
   // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( esRolValido ),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id', 'Este id no corresponde a ningun usuario de nuestra base de datos').custom( idExiste ),
    validarCampos
] , usuariosDelete);

router.patch('/', usuariosPatch);







module.exports = router;