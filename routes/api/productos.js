
var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Producto = require('../../database/models/producto');
const Imagen = require('../../database/models/imagen');

const storage = multer.diskStorage({
    destination: function (res, file, cb) {
        try {
            fs.statSync('./uploads/');
        } catch (e) {
            fs.mkdirSync('./uploads/');
        }
        cb(null, './uploads/');
    },
    filename: (res, file, cb) => {
        cb(null, 'IMG-' + Date.now() + path.extname(file.originalname))
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ) {
        return cb(null, true);
    }
    return cb(new Error('Solo se admiten imagenes png, jpg y jpeg'));
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
}).single('foto');

/* Agregar nuevo producto */
router.post("/", (req, res) => {

    upload(req, res, (error) => {
      if(error){
        return res.status(500).json({
          "error" : error.message
        });
      }else{
        if (req.file == undefined) {
          return res.status(400).json({
            "error" : 'No se recibio la imagen'
          });
        }
        let fields = req.body
        var img = {
          name : req.file.originalname,
          idUsuario: fields.vendedor,
          path : req.file.path,
        };
        var modelImagen = new Imagen(img);
        modelImagen.save()
          .then( (result) => {

            let datos = {
                vendedor:fields.vendedor,
                descripcion:fields.descripcion,
                precio:fields.precio,
                operacion:fields.operacion,
                tipo:fields.tipo,
                zona :fields.zona,
                direccion:fields.direccion,
                superficie:fields.superficie,
                num_cuartos:fields.num_cuartos,
                num_baños:fields.num_baños,
                num_plantas:fields.num_plantas,
                titulo:fields.titulo,
                año_construc:fields.año_construc,
                /*
                lat:fields.lat,
                lon:fields.lon,
                */



                foto:'/api/imagenes/' + result._id,
            }


            const modelProducto = new Producto(datos);
            return modelProducto.save()
          })
          .then(result => {
            res.status(201).json({message: 'Se Agrego la casa',result});
          })
          .catch(err => {
            res.status(500).json({error:err.message})
          });
      }
    });
  });

/* listar Productos para el comprador */
router.get('/', function (req, res, next) {

    let criterios = {};

    if(req.query.descripcion != undefined){
        criterios['$text'] = {$search: req.query.descripcion}
    }
    if(req.query.zona != undefined){
        criterios['$text'] = {$search: req.query.zona}
    }
    Producto.find(criterios)/*.ne('estado','no disponible')*/.exec().then(docs => {
        if(docs.length == 0){
          console.log(criterios[0]);
        return res.status(404).json({message: 'No existen Productos disponibles'});
        }
        res.json({data:docs});
    })
    .catch(err => {
        res.status(500).json({
            error: err.message
        })
    });
});




/* LIstar Productos de un vendedor */
router.get('/vendedor/:id', function (req, res, next) {
    Producto.find({vendedor:req.params.id}).select('-__v').exec().then(docs => {
        if(docs.length == 0){
        return res.status(404).json({message: 'No existen Productos registrados'});
        }
        res.json({data:docs});
    })
    .catch(err => {
        res.status(500).json({
            error: err.message
        })
    });
});
router.get('/:id', function (req, res, next) {
    Producto.findOne({_id:req.params.id}).populate('vendedor','-password -__v ').exec().then(doc => {
        if(doc == null){
        return res.status(404).json({message: 'No existen Productos registrados'});
        }
        console.log(doc);
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json({
            error: err.message
        })
    });
});
/*
router.patch('/:id', function (req, res) {
    let idProducto = req.params.id;
    const datos = {};

    Object.keys(req.body).forEach((key) => {
      if (key != 'vendedor' ||key != 'foto'  ) {
        datos[key] = req.body[key];
      }
    });
    console.log(datos);
    Producto.updateOne({_id: idProducto}, datos).exec()
        .then(result => {
            let message = 'Datos actualizados';
            if (result.ok == 0) {
                message = 'Verifique los datos, no se realizaron cambios';
            }
            if (result.ok == 1 && result.n == 0) {
                message = 'No se encontro el recurso';
            }
            if (result.ok == 1 && result.n == 1 && result.nModified == 0) {
                message = 'Se recibieron los mismos datos antiguos,no se realizaron cambios';
            }
            res.json({
                message,
                result
            });

        }).catch(err => {
            res.status(500).json({
                error: err
            })
        });
});
*/
router.delete("/", async(req, res) => {
  if (req.query.id == null) {
  res.status(300).json({
  msn: "Error no existe id"
  });return;
  }
  var r = await
  Producto.remove({_id: req.query.id});
  res.status(300).json(r);
  });




module.exports = router;
