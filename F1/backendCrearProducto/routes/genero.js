var express = require('express');
var router = express.Router();
var functions = require('./functions');
var logs = require('../utils/log');

const generos = require('../models/generos');
//const log = require('../models/log');

router.post('/generos/', async (req, res, next) => {
    try {
        //throw new Error('something bad happened');
        
        var usuario = "noLogin";
        var idUsuario = "noLogin";
        if (req.headers.usuario) usuario = req.headers.usuario;
        
        var obj = {
            id: req.body.id,
            genero:req.body.genero,
            };


           
        generos.create(req.body).then();
    
                
    
              
        }

    
    catch (err) {
        //console.log("Error Crear Producto  catch general->" + err)
        logs.logErrores("Error::Error inesperado al intentar crear un genero msg:: "+ err, usuario,idUsuario,"Sistema","servicio crear genero", obj);
        
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ codigoEstado: 404, mensaje: "Error Inesperado", objetoError: err });
        next(err);
    }
});

module.exports = router;
