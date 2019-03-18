const express = require("express");
const db = require("./data/db");
const server = express();
server.use(express.json());

//Create
server.post("/api/users", (req, res) => {
  const user = req.body;

  if (user.name && user.bio) {
    db.insert(user)
      .then(id => res.status(201).json(id))
      .catch(err =>
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        })
      );
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

//Read
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." })
    );
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

//Update
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (changes.name && changes.bio) {
    db.update(id, changes)
      .then(count => {
        if (!count) {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        } else {
          res.status(200).json(count);
        }
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "The user information could not be modified." })
      );
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

//Delete
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(204).end();
      }
    })
    .catch(err =>
      res.status(404).json({ error: "The user could not be removed." })
    );
});

server.listen(4000, () => {
  console.log("\n Server is listening on port 4000.");
});
