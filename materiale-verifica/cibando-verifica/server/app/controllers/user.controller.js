const db = require("../models");
const Users = db.users;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create new user
  const users = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role ? req.body.role : 'user'
  });

  // Save user in the database
  users
    .save(users)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new user."
      });
    });
};



// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  Users.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all users."
      });
    });
};



// controller dedicato al login
exports.login = (req, res) => {
  Users.findOne({ email: req.body.email, password: req.body.password })
    .then(data => {
      if(data){
        res.status(200).json(data);
        return;
      }
      res.status(500).send({
        message:
          "Wrong Email or Password"
      });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};


// controller dedicato al dettaglio user
exports.user = (req, res) => {
  Users.findOne({ email: req.body.email})
    .then(data => {
      if(data){
        res.status(200).json(data);
        return;
      }
      res.status(500).send({
        message:
          "Email non trovata"
      });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
