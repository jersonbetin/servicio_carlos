var mongoose = require('mongoose');
var clientModel = require('../../../models/cliente').cliente;
var helpers = require('../../helpers/helpers');


function getAllClients (req, res){
  clientModel.find().exec(function(err, clients){
    if(!err){
      res
      .status(200)
      .send({
        clients:clients
      });
    }else{      
      console.log(err);
      res
      .status(500)
      .send({
        "menssage":"server error",
        "info":"problems in the server"
      });
    }
  });
}

function addClient(req, res){
  console.log(req.body.user);
  if(helpers.isDefined(req.body.user) && helpers.isDefined(req.body.pass) &&
    helpers.isDefined(req.body.last) && helpers.isDefined(req.body.first)){
    var password = helpers.encrypt(req.body.pass);
    var phone = "";
    if(helpers.isDefined(req.body.phone)){
      phone = req.body.phone;
    }
    clientModel.create({
      user:req.body.user,
      password : password,
      name:{
        first : req.body.first,
        last : req.body.last,
      },
      phone:phone

    }, function (error, client){
      if(error){
        if(error.code==11000){
          res.status(406).send('ya existe el cliente');
        }else{
          res.status(500).send('error en el servidor');          
        }
      }else{        
        res.status(200).send({message:"usuario registrado", client:client});
      }
    });

  }else{
    res.status(400).send({error:"faltan datos"});
  }
}

function getClientsLikeById(req, res){
  console.log(req.params.id);
  var regex = new RegExp(req.params.id, "i")
    ,   query = { user: regex };
  clientModel.find(query, function(err, doc) {
   if (err) {
    res.status(500).send({error:"Error en el servidor"});
   }else{    
    res.status(200).send({clients:doc});
   }
  });
}

module.exports = {
  getAllClients : getAllClients,
  addClient : addClient,
  getClientsLikeById : getClientsLikeById
};