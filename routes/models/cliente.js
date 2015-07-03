var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clienteSchema = new Schema({
  user : {type : String, required : true, unique:true},
  password : {type: String, required: true},
  name : {
    first : {type : String, default : ''},
    last : {type : String, default : ''}
  },
  phone:{type: String, default: ''}
});

exports.cliente = mongoose.model('cliente', clienteSchema);