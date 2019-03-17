// ##############################################
//  Les routes pour le service USER de  API
// ##############################################


const	express = require('express'),
		Users = require('../models/Users'),
		router = express.Router();

router.get('/:login', (req, res) => {

  Users.getUser(req.params.login, (err, Users) => {
    if (err)
      return res.json(err);
    return res.json(Users);
  });
});

module.exports = router;