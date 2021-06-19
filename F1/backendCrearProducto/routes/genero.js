var express = require('express');
var router = express.Router();
var functions = require('./functions');
var logs = require('../utils/log');

const generos = require('../models/generos');
router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        generos.create(req.body).then((value) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ codigoEstado: 200, mensaje: "El genero se creo con exito" });
          });              
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
router.get('/getAllGenders',async (req,res,next)=>{
    generos.find({}).then((data)=>{
        res.json({codigoEstado:200, data:data});
    });
});

module.exports = router;
