const mongoose = require('../connect');
const Schema = mongoose.Schema;

const mensajeSchema = Schema({
    vendedor: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        require:'Falta info del vendedor'
    },
    comprador: {// /api/user/id ?
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        require:'Falta info del comprador'
    },
    texto: {
        type: String,
        required: 'debe poner un texto'
    },
    fechaRegistro: {
        type: Date,
        default: Date.now()
    }
});

const mensaje = mongoose.model('Mensaje', mensajeSchema);

module.exports = mensaje;
