const db = require("../models");
const Recipe = db.recipes;

// Create and Save a new Recipe
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Recipe
  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    published: req.body.published ? req.body.published : false,
    difficulty: req.body.difficulty
  });

  // Save the Recipe in the database
  recipe.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new Recipe."
      });
    });
};


// Find a Recipe usando il fulltext come fa google
exports.findString = (req, res) => {

  const testo = req.params.text;

  //Recipe.find({"title": {$regex: /testo/i }})
  //Recipe.find({"title": new RegExp('^' + testo + '$', 'i')})
 // Recipe.find({"title": new RegExp(testo, 'i')})

  Recipe.find(
    { $text: { $search : testo } },
    { score : { $meta: "textScore" } 
  } 
).sort( 
  {  score: { $meta : 'textScore' } }
    )
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found recipe with testo " + testo });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving recipe with testo=" + testo });
    });
};


// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
  Recipe.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving recipes."
      });
    });
};


// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Recipe.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found recipe with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving recipe with id=" + id });
    });
};

// Update a Recipe 
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  Recipe.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found!`
        });
      } else res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Recipe with id=" + id
      });
    });
};

// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Recipe.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`
        });
      } else {
        res.send({
          message: "Recipe was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Recipe with id=" + id
      });
    });
};




