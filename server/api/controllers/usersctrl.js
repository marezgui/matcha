import bcrypt from 'bcrypt';
import util from 'util';
import jwt from 'jsonwebtoken';
import geolib from 'geolib';
import sendmail from '../utils/mail.utils';
import * as mod from '../models/usersmod';
import * as op from '../utils/passport.utils';

//
// ─── REGEX CONSTANT ─────────────────────────────────────────────────────────────
//
const MAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}/;
const VERIF_LN_REGEX = /^[a-zA-Z0-9_.-]*$/;
const VERIF_L_REGEX = /^[a-zA-Z_.-]*$/;

//
// ─── GET FORGOT PASSWORD KEY ────────────────────────────────────────────────────
//
export const getForgotPasswordKey = async (req, res) => {
  const { mail } = req.body;
  if (!MAIL_REGEX.test(mail)) {
    return res.status(303).json({ error: 'Invalid mail.' });
  }
  const getuserbyMail = util.promisify(mod.getuserbyMail);
  const resultUserMail = await getuserbyMail(mail).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  if (resultUserMail === undefined) {
    return res.status(303).json({ error: 'Unknow User email' });
  }
  const resultrestoreKey = util.promisify(mod.getRestoreKey);
  const restoreKey = await resultrestoreKey(mail).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  if (restoreKey) {
    sendmail(mail, 'Matcha Forgot password',
      `Hello ${resultUserMail.firstName}, You have forgot your password on MATCHA, for set a new password past this link into your webrother : http://LINK/${restoreKey} , thanks`,
      `Hello ${resultUserMail.firstName},</br>
      You have forgot your password on MATCHA,</br>
      for set a new password click on this link :</br>
      <a href="http://LINK/${restoreKey}">http://LINK/${restoreKey}</a></br>
      Thanks,</br>
      Matcha Team`);
    return res.status(200).json({ message: 'Done, check your mail' });
  }
  return res.status(303).json({ error: 'Error' });
};

//
// ─── CHANGE PASSWORD FORGOT ─────────────────────────────────────────────────────
//
export const changePassword = async (req, res) => {
  const key = req.params.FPASSWORDKEY;
  const checkpasswordkey = util.promisify(mod.checkForgotKey);
  const mail = await checkpasswordkey(key).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  if (mail === -1) {
    res.status(201).json({ error: 'Key not found' });
    return;
  }
  let { password } = req.body;
  if (!password) {
    res.status(303).json({ error: 'Missing parameters.' });
    return;
  }
  if (!PASSWORD_REGEX.test(password)) {
    res.status(303).json({ error: 'Invalid password. (must length > 5 and include 1 number & uppercase at least)' });
    return;
  }
  const hash = util.promisify(bcrypt.hash);
  password = await hash(password, 5).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  await mod.delRestoreKey(mail, (err, success) => {
    if (err) {
      // console.log(err + success);
    }
  });
  await mod.edituserPassword(mail, password, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit password ${success}` });
  });
};

//
// ─── FUNCTION FOR ADD USER ──────────────────────────────────────────────────────
//
export const adduser = async (req, res) => {
  const { mail, username, password, firstName, lastName } = req.body;
  if (!(mail || username || password || firstName || lastName)) {
    return res.status(303).json({ error: 'Missing parameters.' });
  }
  if (username.length >= 15 || username.length <= 3) {
    return res.status(303).json({ error: 'Invalid username. (must be length 3 - 15)' });
  }
  if (!MAIL_REGEX.test(mail)) {
    return res.status(303).json({ error: 'Invalid mail.' });
  }
  if (!VERIF_L_REGEX.test(firstName)) {
    return res.status(303).json({ error: 'Invalid Firstname, only lettes' });
  }
  if (!VERIF_LN_REGEX.test(username)) {
    return res.status(303).json({ error: 'Invalid Username, only lettes and numbers' });
  }
  if (!VERIF_L_REGEX.test(lastName)) {
    return res.status(303).json({ error: 'Invalid Lastname, only lettes' });
  }
  if (!PASSWORD_REGEX.test(password)) {
    return res.status(303).json({ error: 'Invalid password. (must length > 5 and include 1 number & uppercase at least)' });
  }
  const getuserbyUsername = util.promisify(mod.getuserbyUsername);
  const resultUsername = await getuserbyUsername(username).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  if (resultUsername !== undefined) {
    return res.status(303).json({ error: 'Username Exist' });
  }
  const getuserbyMail = util.promisify(mod.getuserbyMail);
  const resultUserMail = await getuserbyMail(mail).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  if (resultUserMail !== undefined) {
    return res.status(303).json({ error: 'User email already have a account' });
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
  return res.status(303).json({ error: 'Error Add User' });
};

//
// ─── FUNCTION LOGIN ─────────────────────────────────────────────────────────────
//
export const login = async (req, res) => {
  const { mail, password } = req.body;
  if (!(mail || password)) {
    return res.status(303).json({ error: 'Empty form' });
  }
  const getuserbyMail = util.promisify(mod.getuserbyMail);
  const resultUserMail = await getuserbyMail(mail).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  if (resultUserMail === undefined) {
    return res.status(303).json({ error: 'Unknow user mail' });
  }
  const hashcmp = util.promisify(bcrypt.compare);
  const passwdcmp = await hashcmp(password, resultUserMail.password).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  if (resultUserMail.activate === false) {
    return res.status(303).json({ error: `Your account is not activated yet. ${resultUserMail.mail}` });
  }
  if (passwdcmp === true) {
    const payload = { idUser: resultUserMail.idUser };
    const token = jwt.sign(payload, op.opts.secretOrKey);
    mod.connexionLog(mail, true, (err, success) => {
      if (err) {
        mod.delRestoreKey(mail, (errRestore, successRestore) => {
          if (errRestore) {
            // console.log(errRestore + successRestore);
          }
        });
        res.status(303).json({ error: err.error });

      }
      // console.log(`user login ${success}`);
    });
    return res.json({ message: 'Connection Validate', token });
  }
  return res.status(303).json({ error: 'Passwords did not match.' });
};

//
// ─── FUNCTION FOR CONFIRM USER MAIL ─────────────────────────────────────────────
//
export const confirmmail = async (req, res) => {
  const key = req.params.CONFIRMKEY;
  const checkkey = util.promisify(mod.checkkey);
  const goodkey = await checkkey(key).then(data => data).catch(err => err);// { console.error(`[Error]: ${err}`); });
  if (goodkey === -1) {
    return res.status(201).json({ error: 'Key not found' });
  }
  return mod.activeuser(goodkey, (err, success) => {
    if (err) {
      res.status(303).json({ error: err });
      return;
    }
    res.status(200).json({ message: 'User Activate', info: success });
  });
};

//
// ─── FUNCTION GET USER BY ID ────────────────────────────────────────────────────
//
export const getuser = async (req, res) => {
  if (req.user.userIsComplete === false) {
    return res.status(303).json({ error: 'Complete your profile first.' });
  }
  const idUser = Number(req.params.id);
  const finduser = util.promisify(mod.getuserbyIdUser);
  const resultuser = await finduser(idUser).then(data => data)
    .catch((err) => { res.status(303).json({ error: err.error }); });
  if (resultuser.userIsComplete === false) {
    return res.status(303).json({ error: 'This user have not complete his profile.' });
  }
  if (resultuser === undefined) {
    return res.status(303).json({ error: 'User dosnt exist' });
  }
  return res.status(200).json({ user: resultuser });
};

//
// ─── FUNCTION FOR GET THE DISTANCE BTWN USER ────────────────────────────────────
//
export const getUserDistance = async (req, res) => {
  if (req.user.userIsComplete === false) {
    res.status(303).json({ error: 'Complete your profile first.' });
    return;
  }
  const idUser = Number(req.params.id);
  if (isNaN(idUser)) {
    res.status(303).json({ error: 'Id must be a number' });
    return;
  }
  const { user } = req;
  const finduser = util.promisify(mod.getuserbyIdUser);
  const resultuser = await finduser(idUser).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (resultuser === undefined) {
    res.status(303).json({ error: 'User dosnt exist' });
    return;
  }
  if (resultuser.userIsComplete === false) {
    res.status(303).json({ error: 'This user have not complete his profile.' });
    return;
  }
  let distance = await geolib.getDistanceSimple(
    { latitude: resultuser.location.latitude, longitude: resultuser.location.longitude },
    { latitude: user.location.latitude, longitude: user.location.longitude }, { unit: 'm' }
  );
  distance /= 1000;
  res.status(200).json({ distance });
};

//
// ─── GET ALL TAGS OF ALL USERS SANS DOUBLON ─────────────────────────────────────
//
export const getalltag = async (req, res) => {
  const findtag = util.promisify(mod.getalltag);
  const result = [];
  const resulttag = await findtag().then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  for (let i = 0; i < resulttag.length; i += 1) {
    result.push(resulttag[i].tag);
  }
  res.status(200).json({ alltag: result });
};

//
// ─── GET ALL TAGS OF AN USER ────────────────────────────────────────────────────
//
export const getusertag = async (req, res) => {
  const idUser = Number(req.params.id);
  if (isNaN(idUser)) {
    res.status(303).json({ error: 'Id must be a number' });
    return;
  }
  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(idUser).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (resultexist === false) {
    res.status(303).json({ error: 'User dosnt exist' });
    return;
  }
  const findtag = util.promisify(mod.getusertag);
  const result = [];
  const resulttag = await findtag(idUser).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  for (let i = 0; i < resulttag.length; i += 1) {
    result.push(resulttag[i].tag);
  }
  res.status(200).json({ usertag: result });
};

//
// ─── GET INFORMATIONS OF THE CURRENT USER ───────────────────────────────────────
//
export const getme = (req, res) => res.status(200).send(req.user);

//
// ─── DELETE A USER ──────────────────────────────────────────────────────────────
//
export const deluser = async (req, res) => {
  const { mail, password } = req.body;
  if (!(mail || password)) {
    return res.status(303).json({ error: 'Empty form' });
  }
  const getuserbyMail = util.promisify(mod.getuserbyMail);
  const resultUserMail = await getuserbyMail(mail).then(data => data).catch(err => err);// { console.error(`[Error]: ${err}`); });
  if (resultUserMail === undefined) {
    return res.status(303).json({ error: 'Unknow user mail' });
  }
  const hashcmp = util.promisify(bcrypt.compare);
  const passwdcmp = await hashcmp(password, resultUserMail.password).then(data => data).catch(err => err);// { console.error(`[Error]: ${err}`); });
  if (passwdcmp === true) {
    return mod.deluser(req.user.idUser, (err, success) => {
      if (err) {
        res.status(303).json({ error: err.error });
        return;
      }
      res.status(200).json({ message: 'User Delete', info: success });
    });
  }
  return res.status(303).json({ error: 'Passwords did not match.' });
};
