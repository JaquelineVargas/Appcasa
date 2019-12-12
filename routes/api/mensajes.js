var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const Usuario = require('../../database/models/user');
const Mensaje = require('../../database/models/mensaje');


/* crear un nuevo mensaje*/
router.post('/', function(req, res, next) {
  //validar regex
  const data = {
    vendedor: req.body.vendedor,
    comprador: req.body.comprador,
    texto: req.body.texto
  }
  var modelMensaje = new Mensaje(data);
  modelMensaje.save()
  .then(result => {
      res.json({
          message: "Mensaje enviado"
      });
  })
  .catch(err => {
      res.status(500).json({
          error: err.message
      })
  });
});
/*Actualizar mensaje*/
router.patch('/:id',function(req, res, next){
  Mensaje.findOneAndUpdate({_id:req.params.id},{texto:req.body.texto}).exec()
    .then(result => {
      res.json({message:'Se actualizo el mensaje'});
    }).catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});
/*Eliminar Mensaje*/
router.delete('/:id',function(req, res, next){
  Mensaje.remove({_id:req.params.id}).exec()
    .then(result => {
      res.json({message:'mensaje eliminado'});
    }).catch(err => {
      res.status(500).json({
        error: err.message
      });
    });

});

/* Listar todos mensajes del vendedor y comprador*/
router.get('/',function(req, res, next){
  if (req.query.comprador == undefined || req.query.vendedor == undefined) {
    return res.status(401).json({message:'faltan datos del vendedor/comprador'});
  }
  Mensaje
  .find({vendedor:req.query.vendedor,comprador:req.query.comprador})//.sort('fechaRegistro')
  .populate('vendedor','-password -fechaRegistro')
  .populate('comprador','-password -fechaRegistro')
  .exec()
  .then(docs => {
    if (docs.length < 1) {
      return res.status(401).json({message:'No existen mensajes'});
    }
    res.json({data:docs});
  }).catch(err => {
    res.status(500).json({
      error: err.message
    });
  });
});

module.exports = router;
