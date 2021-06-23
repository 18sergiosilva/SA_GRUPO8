var express = require('express');
var router = express.Router();
var crypto = require("crypto-js");

const solicitudes = require('../models/solicitudes');

router.get('/',(req,res,nex)=>{
    try{
        solicitudes.find({}).then((data)=>{
            res.status(200).send(
                {
                    status:200,
                    datos: data
                }
            )
        })
    }catch(error){
        console.log(error);
    }
});

router.post('/new',(req,res,next)=>{
    try{
        const {nombreLibro,nombresAutor,fechaPublicacion,baseArchivo} = req.body
        let data={
            nombreLibro:nombreLibro,
            nombresAutor:nombresAutor,
            fechaPublicacion:fechaPublicacion,
            archivo:""
        }
        solicitudes.create(data).then((value)=>{
            res.status(200).send({status:200,mensaje:"Solicitud creada correctamente"})
        })
    }catch(error){
        console.log(error)
    }
    
});
module.exports = router;