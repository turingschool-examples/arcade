var express = require("express");
var router = express.Router();
var Store = require("../../../models").Store;

/* GET all stores */
router.get("/", function(req, res) {
  Store.findAll()
    .then(store => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(store));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

/* GET single store */
router.get("/:id", function(req, res) {
  Store.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(store => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(store));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

/*POST new store*/
router.post("/", function(req, res) {
  Store.create({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber
  })
    .then(store => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(store));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

/* DELETE a single store */
router.delete("/:id", function(req, res) {
  Store.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

/* UPDATE a single resource */
router.put("/:id", function(req, res) {
  Store.update(
    {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber
    },
    {
      returning: true,
      where: {
        id: parseInt(req.params.id)
      }
    }
  )
    .then(([rowsUpdate, [updatedStore]]) => {
      res.setHeader("Content-Type", "application/json");
      res.status(202).send(JSON.stringify(updatedStore));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

module.exports = router;
