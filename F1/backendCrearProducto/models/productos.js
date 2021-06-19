const mongoose = require('mongoose');

var productoSchema = new mongoose.Schema({
    sku: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: false
    },
    urlImagen: {
        type: String,
        required: false
    },
    Editorial: {
        type: String,
        required: true
    },
    Genero: {
        type: Array,
        required:true
    },
    Stock:{
        type: Number,
        required: true

    }
}, {
    timestamps: true
});

var productos = mongoose.model('producto', productoSchema);

module.exports = productos;