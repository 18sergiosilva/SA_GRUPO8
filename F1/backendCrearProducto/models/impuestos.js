const mongoose = require('mongoose');
var impuestos = new mongoose.Schema({
  porcentaje:{
    type: Number,
    required:true
    },
  precio:{
      type: Number,
      required:true
  },
  totalImpuesto:{
    type: Number,
    required:true
    },
    pais:{
        type: String,
        required:true 
    },
});

var impuesto = mongoose.model('impuesto', impuestos);

module.exports = impuesto;