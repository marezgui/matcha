import bcrypt from 'bcrypt';
import util from 'util';
import jwt from 'jsonwebtoken';
import sendmail from '../utils/mail.utils';
// Passport pour le username/logout -> req.user
import * as mod from '../models/usersmod';
import * as op from '../utils/passport.utils';

// Constants
const MAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}/;
const VERIF_LN_REGEX = /^[a-zA-Z0-9_.-]*$/;
const VERIF_L_REGEX = /^[a-zA-Z_.-]*$/;
const VERIF_BIO = /^[a-zA-Z0-9_.-\s]*$/;
const VERIF_BD = /^((?:0[1-9])|(?:1[0-2]))\/((?:0[0-9])|(?:[1-2][0-9])|(?:3[0-1]))\/(\d{4})$/; // ex : 04/25/1987 month/day/year

// FONCTIONS

export const adduser = async (req, res) => {
  const { mail, username, password, firstName, lastName } = req.body;

  if (!(mail || username || password || firstName || lastName)) {
    return res.status(400).json({ error: 'Missing parameters.' });
  }

  if (username.length >= 15 || username.length <= 3) {
    return res.status(400).json({ error: 'Invalid username. (must be length 3 - 15)' });
  }

  if (!MAIL_REGEX.test(mail)) {
    return res.status(400).json({ error: 'Invalid mail.' });
  }

  if (!VERIF_L_REGEX.test(firstName)) {
    return res.status(400).json({ error: 'Invalid Firstname, only lettes' });
  }

  if (!VERIF_LN_REGEX.test(username)) {
    return res.status(400).json({ error: 'Invalid Username, only lettes and numbers' });
  }

  if (!VERIF_L_REGEX.test(lastName)) {
    return res.status(400).json({ error: 'Invalid Lastname, only lettes' });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ error: 'Invalid password. (must length > 5 and include 1 number & uppercase at least)' });
  }

  const getuserbyUsername = util.promisify(mod.getuserbyUsername);
  const resultUsername = await getuserbyUsername(username).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  if (resultUsername !== undefined) {
    return res.status(400).json({ error: 'Username Exist' });
  }

  const getuserbyMail = util.promisify(mod.getuserbyMail);
  const resultUserMail = await getuserbyMail(mail).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  if (resultUserMail !== undefined) {
    return res.status(400).json({ error: 'User email already have a account' });
  }

  const hash = util.promisify(bcrypt.hash);
  req.body.password = await hash(password, 5).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });

  const getConfirmKey = util.promisify(mod.adduser);
  const confirmKey = await getConfirmKey(req).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });

  if (confirmKey) {
    sendmail(mail, 'Matcha confirmation mail',
      `Hello ${firstName}, You have bee registred on MATCHA, for activate your account past this link into your webrother : http://LINK/${confirmKey} , thanks`,
      `Hello ${firstName},</br>
      You have bee registred on MATCHA,</br>
      for activate your account click on this link :</br>
      <a href="http://LINK/${confirmKey}">http://LINK/${confirmKey}</a></br>
      Thanks,</br>
      Matcha Team`);
    return res.status(200).json({ message: 'Inscription done, check your mail' });
  }
  return res.status(400).json({ error: 'Error Add User' });
};

export const login = async (req, res) => {
  const { mail, password } = req.body;
  if (!(mail || password)) {
    return res.status(401).json({ error: 'Empty form' });
  }

  const getuserbyMail = util.promisify(mod.getuserbyMail);
  const resultUserMail = await getuserbyMail(mail).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });

  const hashcmp = util.promisify(bcrypt.compare);
  const passwdcmp = await hashcmp(password, resultUserMail.password).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });

  if (resultUserMail.activate === false) {
    return res.status(403).json({ error: `Your account is not activated yet. ${resultUserMail.mail}` });
  }

  if (passwdcmp === true) {
    const payload = { iduser: resultUserMail.iduser };
    const token = jwt.sign(payload, op.opts.secretOrKey);
    return res.json({ message: 'Connection Validate', token });
  }
  return res.status(401).json({ error: 'Passwords did not match.' });
};


export const confirmmail = async (req, res) => {
  const key = req.params.CONFIRMKEY;
  const checkkey = util.promisify(mod.checkkey);
  const goodkey = await checkkey(key).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });

  if (goodkey === -1) {
    return res.status(201).json({ error: 'Key not found' });
  }

  return mod.activeuser(goodkey, (err, success) => {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.status(200).json({ message: 'User Activate', info: success });
  });
};

export const getallusers = (req, res) => {
  mod.getallusers((err, success) => res.status(200).json({ success }));
};

export const getuser = (req, res) => {
  const iduser = Number(req.params.id);
  return mod.getuserbyIdUser(iduser, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ user: success });
  });
};

export const getme = (req, res) => res.status(200).send(req.user);

export const deluser = async (req, res) => {
  const { mail, password } = req.body;
  if (!(mail || password)) {
    return res.status(401).json({ error: 'Empty form' });
  }

  const getuserbyMail = util.promisify(mod.getuserbyMail);
  const resultUserMail = await getuserbyMail(mail).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });

  const hashcmp = util.promisify(bcrypt.compare);
  const passwdcmp = await hashcmp(password, resultUserMail.password).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });

  if (resultUserMail.activate === false) {
    return res.status(403).json({ error: `Your account is not activated yet. ${resultUserMail.mail}` });
  }

  if (passwdcmp === true) {
    return mod.deluser(req.user.iduser, (err, success) => {
      if (err) {
        res.status(400).json({ error: err.error });
        return;
      }
      res.status(200).json({ message: 'User Delete', info: success });
    });
  }
  return res.status(401).json({ error: 'Passwords did not match.' });
};

export const edituserMail = async (req, res) => {
  const { mail } = req.body;

  if (!mail) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }

  if (!MAIL_REGEX.test(mail)) {
    res.status(400).json({ error: 'Invalid mail.' });
    return;
  }

  const getuserbyMail = util.promisify(mod.getuserbyMail);
  const resultUserMail = await getuserbyMail(mail).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  if (resultUserMail !== undefined) {
    res.status(400).json({ error: 'User email already have a account' });
    return;
  }

  mod.edituserMail(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit Mail ${success}` });
  });
};

export const edituserUsername = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }

  if (!VERIF_LN_REGEX.test(username)) {
    res.status(400).json({ error: 'Invalid Username, only lettes and numbers' });
    return;
  }

  const getuserbyUsername = util.promisify(mod.getuserbyUsername);
  const resultUsername = await getuserbyUsername(username).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  if (resultUsername !== undefined) {
    res.status(400).json({ error: 'Username Exist' });
    return;
  }
  mod.edituserUsername(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit Username ${success}` });
  });
};


export const edituserPassword = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }

  if (!PASSWORD_REGEX.test(password)) {
    res.status(400).json({ error: 'Invalid password. (must length > 5 and include 1 number & uppercase at least)' });
    return;
  }
  const hash = util.promisify(bcrypt.hash);
  req.body.password = await hash(password, 5).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  mod.edituserPassword(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit password ${success}` });
  });
};

export const edituserFirstName = async (req, res) => {
  const { firstName } = req.body;

  if (!firstName) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }
  if (!VERIF_L_REGEX.test(firstName)) {
    res.status(400).json({ error: 'Invalid Firstname, only lettes' });
    return;
  }
  mod.edituserFirstName(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit firstname ${success}` });
  });
};

export const edituserLastName = async (req, res) => {
  const { lastName } = req.body;

  if (!lastName) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }
  if (!VERIF_L_REGEX.test(lastName)) {
    res.status(400).json({ error: 'Invalid Lastnme, only lettes' });
    return;
  }
  mod.edituserLastName(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit lastname ${success}` });
  });
};

export const edituserBio = async (req, res) => {
  const { bio } = req.body;

  if (!bio) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }
  if (!VERIF_BIO.test(bio)) {
    res.status(400).json({ error: 'Invalid Bio, only lettes and numbers' });
    return;
  }
  mod.edituserBio(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit Bio ${success}` });
  });
};

export const edituserGenre = async (req, res) => {
  const { genre } = req.body;

  if (!genre) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }

  if (!(genre === 'M' || genre === 'W' || genre === 'O')) {
    res.status(400).json({ error: 'Error genre.' });
    return;
  }

  mod.edituserGenre(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit genre ${success}` });
  });
};

export const edituserOrientation = async (req, res) => {
  const { orientation } = req.body;

  if (!orientation) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }

  if (!(orientation === 'M' || orientation === 'W' || orientation === 'BI')) {
    res.status(400).json({ error: 'Error orientation.' });
    return;
  }

  mod.edituserOrientation(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit orientation ${success}` });
  });
};


export const edituserDateOfBirth = async (req, res) => {
  const { dateOfBirth } = req.body;

  if (!dateOfBirth) {
    res.status(400).json({ error: 'Missing parameters.' });
    return;
  }

  if (!VERIF_BD.test(dateOfBirth)) {
    res.status(400).json({ error: 'Invalid date of birth. ex : 04/25/1987 month/day/year' });
    return;
  }

  mod.edituserDateOfBirth(req, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit dateOfBirth ${success}` });
  });
};
