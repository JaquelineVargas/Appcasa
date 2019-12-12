const mongoose = require('../connect');
const Schema = mongoose.Schema;

const productoSchema = Schema({

    vendedor: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        require:'Falta info del vendedor'
    },
    descripcion: String,
    precio: Number,
    operacion:{
        type: String,
        enum:['venta','alquiler'],
    },//estado
    tipo:{
      type: String,
      enum:['vivienda','departamento','terreno'],
    },//categoria
    lat : Number,
    lon : Number,
    foto: String,
    zona : String,
    direccion : String,
    superficie: String,
    num_cuartos: String,
    num_baños: String,
    num_plantas: String,
    titulo: String,
    año_construc: String,
    fechaRegistro: {
        type: Date,
        default: Date.now()
    },
});

const producto = mongoose.model('Producto', productoSchema);

module.exports = producto;
