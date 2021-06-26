const mongoose = require('mongoose');
var bitacoras = new mongoose.Schema({
    Editorial:{
        type: String,
        required:true
    }
    ,actividad:{
    type: String,
    required:true
    },
    fechaGenerado: {
        type: Date,
        required: false,
        default: new Date()
    }  
}); 

var bitacora = mongoose.model('bitacora', bitacoras);

module.exports = bitacora;