var express = require('express');
var router = express.Router();
var functions = require('./functions');
var logs = require('../utils/log');

const impuesto = require('../models/impuestos');

router.post('/calculate',(req,res)=>{
    const {porcentaje,precio,pais} = req.body;
    let por= Number(porcentaje)/100;
    let pre = Number(precio);
    let total = por*pre;
    let datasend={
        porcentaje:por,
        precio,pre,
        totalImpuesto:total,
        pais:pais
    }
    impuesto.create(datasend).then((values)=>{
        res.status(200).send({mensaje:"El impuesto fue calculado",data:datasend,status:200});    
    })
});

router.get('/',(req,res)=>{
    impuesto.find({}).then((data)=>{
        res.status(200).send({
            mensaje:"Datos encontrados",
            datos:data
        })
    })
})

module.exports = router;