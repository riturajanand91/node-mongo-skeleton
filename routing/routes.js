const express = require("express");
const router = new express.Router();
const Users = require("../models/user");

//Defining our Routes
///CRUD:

// POST method to CREATE
router.post("/api/users", async (req, res) => {
    const users = new Users(req.body);
    console.log(users);
    try {
      await users.save();
      res.status(201).send({ users });
    } catch (e) {
      res.status(400).send();
    }
  });

// GET method to READ/FETCH
  router.get("/api/users", async (req, res) => {
    try {
      const users = await Users.find({});
      res.status(200).send({ users });
    } catch (e) {
      res.status(500).send();
    }
  });

// GET method to READ/FETCH BY SPECIFIC ID
router.get("/api/users/:id", async (req, res) => {
    const _id = req.params.id;
    try {
      const users = await Users.findById(_id);
      if (!users) {
        return res.status(404).send("No User Found");
      }
      res.send(users);
    } catch (e) {
      res.status(500).send(e);
    }
  });

// PATCH method to UPDATE
router.patch("/api/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["email", "contact", "address"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  const _id = req.params.id;

  try {
    const users = await Users.findById(_id);
    updates.forEach((update) => (users[update] = req.body[update]));
    await users.save();
    if (!users) {
      return res.status(404).send("No User Found");
    }
    res.send(users);
    console.log("User details Updated");
  } catch (e) {
    res.status(500).send(e);
  }
});
// /api/users/
// DELETE method to DELETE
router.delete("/api/users/:id", async (req, res) => {
    try {
      const users = await Users.findByIdAndDelete(req.params.id);
      if (!users) {
        return res.status(404).send();
      }
      res.send(users);
      
    } catch (e) {
      res.status(201).send();
    }
  });

//Exporting for reuse
module.exports = router;