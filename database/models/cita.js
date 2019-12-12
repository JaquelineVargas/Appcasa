 const mongoose = require('../connect');
const Schema = mongoose.Schema;

const citaSchema = Schema({
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
    producto: {
        type: Schema.Types.ObjectId,
        ref: "Producto",
        require:'Falta info del producto'
    },
    cantidad:{
        type:Number,
        require:'Debe poner una cantidad de producto'
    },
    estado: {   // por confirmar, cancelada, terminada
        type: String,
        required: 'Falta el estado'
    },
    fechaCita: Date,
    horaCita: String,
    log: Number,
    lat: Number,
    fechaRegistro: {
        type: Date,
        default: Date.now()
    }
});

const cita = mongoose.model('Cita', citaSchema);

module.exports = cita;
