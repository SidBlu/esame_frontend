module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/signup", users.create);

    // Retrieve all users
    router.get("/", users.findAll);

    // Api dedicata a fare il login
    router.post("/login", users.login);

    // Api dedicata al dettaglio utente
    router.post("/user", users.user);

    app.use('/api/users', router);
  };