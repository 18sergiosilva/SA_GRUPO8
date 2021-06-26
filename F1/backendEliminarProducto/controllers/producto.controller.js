const modelProducto = require('../models/producto.model');
const { borrarImagen } = require("../utils/s3.utils");
var logs = require('../utils/log');
const bitacora = require('../models/bitacora');

module.exports = {
    eliminar: (req, res) => {
        const idProducto = req.params.id;
        console.log(idProducto);
        
        var obj = {
            id: idProducto 
        };
        
        //var id = req.params.id;
        var usuario = "noLogin";
        var idUsuario = "noLogin";
        //var orden = {};
        //console.log("idUsuarioi --> " + req.headers.idusuario);
        if (req.headers.usuario) usuario = req.headers.usuario;
        if (req.headers.idusuario) idUsuario = req.headers.idusuario;

        modelProducto.findByIdAndRemove(idProducto).then(producto => {
            if (producto) {
                bitacora.create({Editorial:req.headers.usuario,actividad:"Producto eliminado por editorial"}).then();
                return res.status(200).send({
                    mensaje: "Eliminado correctamente",
                    codigoEstado:200
                })   
            } else {
                logs.logErrores("Error-Eliminar:: No existe producto con id " + idProducto, usuario,idUsuario,"Usuario","servicio eliminar producto", obj);
                return res.status(404).send({
                    mensaje: "No existe producto con id " + idProducto
                })
            }
        })
    }
}