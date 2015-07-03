"use strict"
var ClientsController = require("../controller/api/clientes/clientes_controller");
module.exports = function apiRoutes(app) {
  app.all('*', function(req, res, next){
      console.log('always passes for here', req.body, req.method);
      next();
  });

  //path about admins
  app.route("/api/client")
    .get(ClientsController.getAllClients)
    .post(ClientsController.addClient);
  app.route("/api/client/:id")
    .get(ClientsController.getClientsLikeById); 




  //config: when don't exist the path
  app.use(function(req, res, next){
    res
      .status(404)
      .send({
        "error":{
          "error" : "RequestNotFound",
          "message" : "the path don´t exists, try another"

        }
      })
  });
}