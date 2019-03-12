var express = require('express');
var Users = require('../models/Users');

var router = express.Router();

router.get('/', (req, res) => {
  Users.retrieveAll((err, Users) => {
    if (err)
      return res.json(err);
    return res.json(Users);
  });
});

/*
router.post('/', (req, res) => {
  var users = req.body.users;

  Users.insert(user, (err, result) => {
      if (err)
        return res.json(err);
      return res.json(result);
    });
});*/

module.exports = router;