const	express = require('express');
const Users = require('../models/Users');
const router = express.Router();

router.get('/:login', (req, res) => {
  Users.getUser(req.params.login, (err, Users) => {
    if (err)
      return res.json(err);
    return res.json(Users);
  });
});

module.exports = router;