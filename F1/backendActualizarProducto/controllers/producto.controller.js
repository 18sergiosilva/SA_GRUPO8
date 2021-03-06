const modelProducto = require('../models/producto.model');
const { borrarImagen, subirImagen } = require("../utils/s3.utils");
var logs = require('../utils/log');

module.exports = {
    actualizar: (req, res) => {
        const idProducto = req.params.id;
        const { nombre, precio, descripcion, Editorial, Genero, Stock} = req.body;
        var update = {};

        //console.log("id --> "+ idProducto);
        //console.log("nombre --> "+ nombre);

        var usuario = "noLogin";
        var idUsuario = "noLogin";

        var productoActual = {
            id:"",
            sku:"",
            nombre:"",
            precio:"",
            descripcion:"",
            imagen:"",
            urlImagen:"",
            Editorial:"",
            Genero:"",
            Stock:""
        };

        var productoActualizado = {
            id:"",
            sku:"",
            nombre:"",
            precio:"",
            descripcion:"",
            imagen:"",
            urlImagen:"",
            Editorial:"",
            Genero:"",
            Stock:""
        };

        productoActualizado.id = idProducto;
        if (nombre){
            update.nombre = nombre;
            productoActualizado.nombre = nombre;
        } 
        if (precio){
            update.precio = precio;
            productoActualizado.precio = precio; 
        } 
        if (descripcion){
            update.descripcion = descripcion;
            productoActualizado.descripcion = descripcion;
        }if (Editorial){
            update.Editorial = Editorial;
            productoActualizado.Editorial = Editorial; 
        } 
        if (Genero){
            update.Genero = Genero;
            productoActualizado.Genero = Genero;
        }
        if (Stock){
            update.Stock = Stock;
            productoActualizado.Stock = Stock;
        } 


        

        modelProducto.findById(idProducto).then(producto => {
            if (producto) {
                //console.log(producto);
                productoActual = producto;
                //console.log("variable -->" +productoActual);
                modelProducto.findByIdAndUpdate(idProducto, update).then(producto => {

                    return res.send({
                        mensaje: "Producto actualizado exitosamente"
                    });
                })

            } else {
                logs.logErrores("Error:: No existe producto con id " + idProducto, usuario,idUsuario,"Admin","servicio actualizar Producto",productoActualizado);
                return res.status(404).send({
                    mensaje: "No existe producto con id " + idProducto
                })
            }
        }).catch(err => {
            logs.logErrores("Error:: " + err, usuario,idUsuario,"Sistema","servicio actualizar Producto");
            console.log(err);
            return res.status(500).send({
                mensaje: "Ocurrio un error en la actualizacion de producto"
            })
        })
    }
}