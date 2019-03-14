const	express = require('express'),
		Users = require('../models/Users'),
		router = express.Router();

router.get('/', (req, res) => {
  let user = "jdoe";
  Users.getUser(user, (err, Users) => {
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