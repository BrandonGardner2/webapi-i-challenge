const express = require("express");
const db = require("./data/db");
const server = express();
server.use(express.json());

//Create
server.post("/api/users", (req, res) => {
  const user = req.body;

  db.insert(user)
    .then(id => res.status(201).json(id))
    .catch(err =>
      res.status(500).json({ message: "Error creating a new user." })
    );
});

//Read
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res.status(500).json({ message: "Error retrieving the users." })
    );
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => res.status(200).json(user))
    .catch(err =>
      res.status(404).json({ message: "User could not be located." })
    );
});

//Update
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(count => res.status(200).json(count))
    .catch(err =>
      res.status(500).json({ message: "There was an error updating the user." })
    );
});

//Delete
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(() => res.status(204).end())
    .catch(err =>
      res.status(404).json({ message: "That user could not be located." })
    );
});

server.listen(4000, () => {
  console.log("\n Server is listening on port 4000.");
});
