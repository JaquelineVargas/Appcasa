const mongoose = require('../connect');
const Schema = mongoose.Schema;
const usuarioSchema = Schema({
    name: String,
    email: {
        type: String,
        required: 'Falta el email',
        match: /^(([^<>()\[\]\.,;:\s @\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    },
    password: {
        type: String,
        required: ['Contraseña necesaria'],
    },
    phone: Number,
    tipo: {
      type:String,
      enum:['comprador', 'vendedor','admin']
    },
    fechaRegistro: {
        type: Date,
        default: Date.now()
    },
    //admin:Boolean,
});

const usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = usuario;
