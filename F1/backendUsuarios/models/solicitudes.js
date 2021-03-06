const mongoose = require('mongoose');

var solicitudesSchema = new mongoose.Schema({
    nombreLibro: {
        type: String,
        required: true
    },
    nombresAutor: {
        type: String,
        required: true
    },
    fechaPublicacion: {
        type: String,
        required: true
    },
    archivo:{
        type:String,
        required:false
    }
});
var solicitud = mongoose.model('solicitud', solicitudesSchema);

module.exports = solicitud;