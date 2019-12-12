var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });


});

router.get('/lab7', function(req, res, next) {
    const urls = [
      'https://s3-us-west-2.amazonaws.com/devcodepro/media/blog/la-fundacion-de-google.png',
      'https://cdn.pixabay.com/photo/2017/03/01/23/33/tomatoes-2109948__340.jpg',
      'https://cdn.pixabay.com/photo/2018/06/14/11/30/salad-bowl-3474690__340.jpg',
      'https://cdn.pixabay.com/photo/2018/06/16/12/12/salad-bowl-3478691__340.jpg',
      'https://cdn.pixabay.com/photo/2016/07/13/15/41/india-1514764__340.jpg',
      'https://cdn.pixabay.com/photo/2018/02/26/04/54/food-3182306_960_720.jpg',
      'https://cdn.pixabay.com/photo/2014/04/03/11/49/server-312236_960_720.png'
    ]

    const titulo = [
      'Google',
      'Bocados',
      'Plato',
      'Fuente',
      'Mesero',
      'Pai',
      'Icono',
    ]

    const descripcion = [
      'Navegador',
      'Deliciosos',
      'Fino',
      'Grande',
      'Indu',
      'Delicioso',
      'Restaurant',
    ]
    const data = [];
    for (let index = 0; index < urls.length ; index++) {

        let item = {};

        item.descripcion = descripcion[index];
        item.title = titulo[index];
        item.image = urls[index];
        data.push(item);
    }

    res.json({
        data
    });

});

module.exports = router;
