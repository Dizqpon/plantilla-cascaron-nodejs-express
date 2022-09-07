const Role = require('../models/role');
const User = require('../models/user');


const esRolValido =  async (role = '') =>   {
    const existeRole = await Role.findOne({ role });
    if (!existeRole) {
        throw new Error(`El rol ${role} no existe en la base de datos`)
    }  
}

const emailExiste = async (email) => {
    // Verificar si el correo existe
    const existeEmail = await User.findOne( { email } );
    if (existeEmail) {
        throw new Error(`El email ${email} ya existe`)
    }
}

const idExiste = async (id) => {
    // Verificar si el correo existe
    const existeId = await User.findById(  id  );
    if (!existeId) {
        throw new Error(`El id ${id} no corresponde a ningún usuario de nuestra base de datos`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    idExiste
}
