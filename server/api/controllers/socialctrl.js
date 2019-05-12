import * as mod from '../models/socialmod';

// Constants
/*
const MAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)
                  |(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.
                  [0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}/;
const VERIF_LN_REGEX = /^[a-zA-Z0-9_.-]*$/;
const VERIF_L_REGEX = /^[a-zA-Z_.-]*$/;
*/

// FONCTIONS

export const getUsersForMe = (req, res) => {
  const count = Number(req.params.count);
  const start = Number(req.params.start);
  mod.getUsersForMe(req.user, count, start, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error }); return;
    }
    res.status(200).json({ result: success });
  });
};
