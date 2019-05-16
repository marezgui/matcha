import bcrypt from 'bcrypt';
import util from 'util';
import jwt from 'jsonwebtoken';
import geolib from 'geolib';
import sendmail from '../utils/mail.utils';
// Passport pour le username/logout -> req.user
import * as mod from '../models/usersmod';
import * as op from '../utils/passport.utils';

// Constants
const MAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}/;
const VERIF_LN_REGEX = /^[a-zA-Z0-9_.-]*$/;
const VERIF_L_REGEX = /^[a-zA-Z_.-]*$/;

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

  if (resultUserMail === undefined) {
    return res.status(400).json({ error: 'Unknow user mail' });
  }

  const hashcmp = util.promisify(bcrypt.compare);
  const passwdcmp = await hashcmp(password, resultUserMail.password).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });

  if (resultUserMail.activate === false) {
    return res.status(403).json({ error: `Your account is not activated yet. ${resultUserMail.mail}` });
  }

  if (passwdcmp === true) {
    const payload = { idUser: resultUserMail.idUser };
    const token = jwt.sign(payload, op.opts.secretOrKey);
    mod.connexionLog(mail, (err, success) => {
      if (err) {
        res.status(400).json({ error: err.error });
        return;
      }
      console.log(success);
    });
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

export const getuser = async (req, res) => {
  const idUser = Number(req.params.id);

  const finduser = util.promisify(mod.getuserbyIdUser);
  const resultuser = await finduser(idUser).then(data => data)
    .catch((err) => { res.status(400).json({ error: err.error }); });

  if (resultuser === undefined) {
    return res.status(400).json({ error: 'User dosnt exist' });
  }
  return res.status(200).json({ user: resultuser });
};

export const getUserDistance = async (req, res) => {
  const idUser = Number(req.params.id);
  const { user } = req;
  const finduser = util.promisify(mod.getuserbyIdUser);
  const resultuser = await finduser(idUser).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
  if (resultuser === undefined) {
    res.status(400).json({ error: 'User dosnt exist' });
    return;
  }
  let distance = await geolib.getDistanceSimple(
    { latitude: resultuser.location.latitude, longitude: resultuser.location.longitude },
    { latitude: user.location.latitude, longitude: user.location.longitude }, { unit: 'm' }
  );
  distance /= 1000;
  res.status(200).json({ distance });
};

export const getalltag = (req, res) => mod.getalltag((err, success) => {
  if (err) {
    res.status(400).json({ error: err.error });
    return;
  }
  res.status(200).json({ alltag: success });
});

export const getusertag = async (req, res) => {
  const idUser = Number(req.params.id);

  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(idUser).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (resultexist === false) {
    res.status(400).json({ error: 'User dosnt exist' });
    return;
  }
  mod.getusertag(idUser, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error });
      return;
    }
    res.status(200).json({ usertag: success });
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

  if (resultUserMail === undefined) {
    return res.status(400).json({ error: 'Unknow user mail' });
  }

  const hashcmp = util.promisify(bcrypt.compare);
  const passwdcmp = await hashcmp(password, resultUserMail.password).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });

  if (passwdcmp === true) {
    return mod.deluser(req.user.idUser, (err, success) => {
      if (err) {
        res.status(400).json({ error: err.error });
        return;
      }
      res.status(200).json({ message: 'User Delete', info: success });
    });
  }
  return res.status(401).json({ error: 'Passwords did not match.' });
};
