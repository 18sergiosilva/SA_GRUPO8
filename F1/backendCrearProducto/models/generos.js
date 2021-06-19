const mongoose = require('mongoose');
var geneross = new mongoose.Schema({
  id:{
      type: Number,
      required:true
  },
  genero:{
    type: String,
    required:true
}  
});

var generos = mongoose.model('genero', geneross);

module.exports = generos;