var express = require('express');
var router = express.Router();
var crypto = require("crypto-js");

const solicitudes = require('../models/solicitudes');
const bitacora = require('../models/bitacora');

router.get('/',(req,res,nex)=>{
    try{
        const status = {status:0};
        solicitudes.find(status).then((data)=>{
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
router.post('/updatestatus', async (req, res, next) => {
    status = 1;
    const { nombreLibro } = req.body;
    var objbitacora={
        Editorial: req.body.Editorial,
        actividad:"Solicitud aceptada por editorial "+req.body.Editorial
    }
    solicitudes.findOne({nombreLibro})
    .then(user=>{
      if(user){
        user.status = status;
        newdatausr = user;
        solicitudes.updateOne({nombreLibro}, newdatausr,async(err,res)=>{
          if(err){
            return({
              codigoEstado: 400,
              mensaje: "Existio algun error con la solicitud de "+nombreLibro
            });
          }else{
            bitacora.create(objbitacora).then();
            return({
              codigoEstado: 200,
              mensaje: "Libro actualizado con exito"
            });
          }
        })
        res.status(200).send({
          codigoEstado: 200,
          mensaje: "Libro actualizado con exito"
        });
      }else{
        res.status(404).send({
          codigoEstado: 404,
          mensaje: "No existe usuario con username " + username
        });
      }
    })
  })
  
router.post('/new',(req,res,next)=>{
    try{
        const {nombreLibro,nombresAutor,fechaPublicacion,baseArchivo,status} = req.body
        let data={
            nombreLibro:nombreLibro,
            nombresAutor:nombresAutor,
            fechaPublicacion:fechaPublicacion,
            archivo:"",
            status
        }
        solicitudes.create(data).then((value)=>{
            res.status(200).send({status:200,mensaje:"Solicitud creada correctamente"})
        })
    }catch(error){
        console.log(error)
    }
    
});
module.exports = router;