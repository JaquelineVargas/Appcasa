const mongoose = require('mongoose');
mongoose.connect("mongodb://172.30.0.2:27017/AppCasa", {
    useNewUrlParser: true
}).then(() => {
    console.log('conexion a mongodb exitosa');
}).catch(err => {
    console.log('Error en la conexion hacia mongo DB');
});
module.exports = mongoose;
