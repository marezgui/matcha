import bcrypt from 'bcrypt';
import util from 'util';
import * as mod from '../models/editusermod';
import { getusertag, getuserbyUsername } from '../models/usersmod';

//
// ─── REGEX ──────────────────────────────────────────────────────────────────────
//
const MAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}/;
const VERIF_LN_REGEX = /^[a-zA-Z0-9_.-]*$/;
const VERIF_L_REGEX = /^[a-zA-Z_.-]*$/;
const VERIF_BIO = /^[a-zA-Z0-9_.,'"-\s]*$/;
const VERIF_BD = /^((?:0[1-9])|(?:1[0-2]))\/((?:0[0-9])|(?:[1-2][0-9])|(?:3[0-1]))\/(\d{4})$/; // ex : 04/25/1987 month/day/year

//
// ─── CHECK USERISCOMPLETE ───────────────────────────────────────────────────────
//
export const checkUserIsComplete = async (req, res) => {
  const { user } = req;
  const { location } = user;
  const { photo } = user;
  let err = 0;
  const checkUserComplete = util.promisify(mod.editUserIsComplete);
  if (user.bio === '' || user.bio === null) {
    err = 2;
  } else if (user.dateOfBirth === null) {
    err = 3;
  } else if (photo.master === null || photo.master === undefined || photo.master === '') {
    err = 4;
  } else if ((photo.image1 === '' || photo.image1 === null || photo.image1 === undefined)
    && (photo.image2 === '' || photo.image2 === null || photo.image2 === undefined)
    && (photo.image3 === '' || photo.image3 === null || photo.image3 === undefined)
    && (photo.image4 === '' || photo.image4 === null || photo.image4 === undefined)
    && (photo.image5 === '' || photo.image5 === null || photo.image5 === undefined)) {
    err = 5;
  } else if ((location.longitude === '' || location.longitude === null || location.longitude === undefined)
    || (location.latitude === '' || location.latitude === null || location.latitude === undefined)) {
    err = 6;
  } else if (err === 0) {
    if (user.userIsComplete === false) {
      await checkUserComplete(user.idUser, true).then().catch(error => error);// console.log(`[Error]: ${error}`); });
    } res.status(200).json({ message: 'Profil Complite' });

  } else if (err !== 0) {
    if (user.userIsComplete === true) {
      await checkUserComplete(user.idUser, false).then().catch(error => error);// console.log(`[Error]: ${error}`); });
    } res.status(303).json({ error: `Profil NOT Complite ${err}` });
  }
};

//
// ─── EDIT USER MAIL ─────────────────────────────────────────────────────────────
//
export const edituserMail = async (req, res) => {
  const { mail } = req.body;
  if (!mail) {
    res.status(303).json({ error: 'Missing parameters.' });
    return;
  }
  if (!MAIL_REGEX.test(mail)) {
    res.status(303).json({ error: 'Invalid mail.' });
    return;
  }
  if (mail.length > 950) {
    res.status(303).json({ error: 'mail is too long.' });
    return;
  }
  const getuserbyMail = util.promisify(mod.getuserbyMail);
  const resultUserMail = await getuserbyMail(mail).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  if (resultUserMail !== undefined) {
    res.status(303).json({ error: 'User email already have a account' });
    return;
  }
  mod.edituserMail(req, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit Mail ${success}` });
  });
};

//
// ─── EDIT USER NAME ─────────────────────────────────────────────────────────────
//
export const edituserUsername = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    res.status(303).json({ error: 'Missing parameters.' });
    return;
  }
  if (!VERIF_LN_REGEX.test(username)) {
    res.status(303).json({ error: 'Invalid Username, only lettes and numbers' });
    return;
  }
  if (username.length > 950) {
    res.status(303).json({ error: 'username is too long.' });
    return;
  }
  const getuserbyUsernameFct = util.promisify(getuserbyUsername);
  const resultUsername = await getuserbyUsernameFct(username).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  if (resultUsername !== undefined) {
    res.status(303).json({ error: 'Username Exist' });
    return;
  }
  mod.edituserUsername(req, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit Username ${success}` });
  });
};

//
// ─── EDIT USER PASSWORD ─────────────────────────────────────────────────────────
//
export const edituserPassword = async (req, res) => {
  const { password } = req.body;
  if (!password) {
    res.status(303).json({ error: 'Missing parameters.' });
    return;
  }
  if (!PASSWORD_REGEX.test(password)) {
    res.status(303).json({ error: 'Invalid password. (must length > 5 and include 1 number & uppercase at least)' });
    return;
  }
  const hash = util.promisify(bcrypt.hash);
  req.body.password = await hash(password, 5).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  mod.edituserPassword(req, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit password ${success}` });
  });
};

//
// ─── EDIT USER FIRST NAME ───────────────────────────────────────────────────────
//
export const edituserFirstName = async (req, res) => {
  const { firstName } = req.body;
  if (!firstName) {
    res.status(303).json({ error: 'Missing parameters.' });
    return;
  }
  if (!VERIF_L_REGEX.test(firstName)) {
    res.status(303).json({ error: 'Invalid Firstname, only lettes' });
    return;
  }
  if (firstName.length > 950) {
    res.status(303).json({ error: 'firstName is too long.' });
    return;
  }
  mod.edituserFirstName(req, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit firstname ${success}` });
  });
};

//
// ─── EDIT USER LAST NAME ────────────────────────────────────────────────────────
//
export const edituserLastName = async (req, res) => {
  const { lastName } = req.body;
  if (!lastName) {
    res.status(303).json({ error: 'Missing parameters.' });
    return;
  }
  if (!VERIF_L_REGEX.test(lastName)) {
    res.status(303).json({ error: 'Invalid Lastnme, only lettes' });
    return;
  }
  if (lastName.length > 950) {
    res.status(303).json({ error: 'lastname is too long.' });
    return;
  }
  mod.edituserLastName(req, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit lastname ${success}` });
  });
};

//
// ─── EDIT USER BIO ──────────────────────────────────────────────────────────────
//
export const edituserBio = async (req, res) => {
  const { bio } = req.body;
  if (!bio) {
    res.status(303).json({ error: 'Missing parameters.' });
    return;
  }
  if (!VERIF_BIO.test(bio)) {
    res.status(303).json({ error: 'Invalid Bio, only lettes and numbers' });
    return;
  }
  if (bio.length > 950) {
    res.status(303).json({ error: 'bio is too long.' });
    return;
  }
  mod.edituserBio(req, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit Bio ${success}` });
  });
};

//
// ─── EDIT USER GENRE ────────────────────────────────────────────────────────────
//
export const edituserGenre = async (req, res) => {
  const { genre } = req.body;
  if (!genre) {
    res.status(303).json({ error: 'Missing parameters.' });
    return;
  }
  if (!(genre === 'M' || genre === 'W' || genre === 'O')) {
    res.status(303).json({ error: 'Error genre.' });
    return;
  }
  mod.edituserGenre(req, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit genre ${success}` });
  });
};

//
// ─── EDIT USER ORIENTATION ──────────────────────────────────────────────────────
//
export const edituserOrientation = async (req, res) => {
  const { orientation } = req.body;
  if (!orientation) {
    res.status(303).json({ error: 'Missing parameters.' });
    return;
  }
  if (!(orientation === 'M' || orientation === 'W' || orientation === 'BI')) {
    res.status(303).json({ error: 'Error orientation.' });
    return;
  }
  mod.edituserOrientation(req, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit orientation ${success}` });
  });
};

//
// ─── EDIT USER NOTIF ────────────────────────────────────────────────────────────
//
export const edituserNotif = async (req, res) => {
  const { notif } = req.body;
  if (!notif) {
    res.status(303).json({ error: 'Missing parameters.' });
    return;
  }
  if (notif !== true && notif !== false) {
    res.status(303).json({ error: 'Invalid notif' });
    return;
  }
  mod.edituserNotif(notif, req, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit dateOfBirth ${success}` });
  });
};

//
// ─── EDIT USER DATE OF BIRTH ────────────────────────────────────────────────────
//
export const edituserDateOfBirth = async (req, res) => {
  const { dateOfBirth } = req.body;
  if (!dateOfBirth) {
    res.status(303).json({ error: 'Missing parameters.' });
    return;
  }
  if (!VERIF_BD.test(dateOfBirth)) {
    res.status(303).json({ error: 'Invalid date of birth. ex : 04/25/1987 month/day/year' });
    return;
  }
  mod.edituserDateOfBirth(req, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `User Edit dateOfBirth ${success}` });
  });
};

//
// ─── REMOVE A TAG ───────────────────────────────────────────────────────────────
//
export const removetag = (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    res.status(303).json({ error: 'Missing parameters.' });
    return;
  }
  if (!VERIF_LN_REGEX.test(tag)) {
    res.status(303).json({ error: 'Invalid tag, only lettes and numbers' });
    return;
  }
  mod.removetag(req, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `Tag removed ${success}` });
  });
};

//
// ─── ADD A NEW TAG ──────────────────────────────────────────────────────────────
//
export const addtag = async (req, res) => {
  const { tag } = req.body;
  const { iduser } = req.user;
  if (!tag) {
    res.status(303).json({ error: 'Missing parameters.' });
    return;
  }
  if (!VERIF_LN_REGEX.test(tag)) {
    res.status(303).json({ error: 'Invalid tag, only lettes and numbers' });
    return;
  }
  if (tag.length > 950) {
    res.status(303).json({ error: 'tag is too long.' });
    return;
  }
  const gettaglist = util.promisify(getusertag);
  const taglist = await gettaglist(iduser).then(data => data).catch((err) => { console.error(`[Error]: ${err}`); });
  // si tag est dega dans taglist on return
  for (let i = 0; i < taglist.length; i += 1) {
    if (tag === taglist[i].tag) {
      res.status(303).json({ error: 'Tag exist' });
      return;
    }
  }
  // on verifi son nombre de tag max 5
  if (taglist.length > 4) {
    res.status(303).json({ error: 'You have already 5 tag' });
    return;
  }
  mod.addtag(req, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `Tag added ${success}` });
  });
};

//
// ─── EDIT USER PHOTOS ───────────────────────────────────────────────────────────
//
export const edituserPhoto = async (req, res) => {
  let { photo } = req.body;
  if (typeof photo === 'undefined') {
    return res.status(303).json({ error: 'Missing arguments photo' });
  }
  photo = JSON.parse(photo);
  if (typeof photo.master === 'undefined') {
    return res.status(303).json({ error: 'Missing arguments master' });
  }
  if (typeof photo.image1 === 'undefined') {
    return res.status(303).json({ error: 'Missing arguments image1' });
  }
  if (typeof photo.image2 === 'undefined') {
    return res.status(303).json({ error: 'Missing arguments image2' });
  }
  if (typeof photo.image3 === 'undefined') {
    return res.status(303).json({ error: 'Missing arguments image3' });
  }
  if (typeof photo.image4 === 'undefined') {
    return res.status(303).json({ error: 'Missing arguments image4' });
  }
  if (typeof photo.image5 === 'undefined') {
    return res.status(303).json({ error: 'Missing arguments image5' });
  }
  return mod.editPhoto(req, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `Photo edit success ${success}` });
  });
};

//
// ─── EDIT USER LOCATION ─────────────────────────────────────────────────────────
//
export const edituserLocation = async (req, res) => {
  const { location } = req.body;
  if (typeof location === 'undefined') {
    return res.status(303).json({ error: 'Missing arguments Location' });
  }
  if (typeof location.street === 'undefined') {
    location.street = '';
  }
  if (typeof location.city === 'undefined') {
    location.city = '';
  }
  if (typeof location.state === 'undefined') {
    location.state = '';
  }
  if (typeof location.postcode === 'undefined') {
    location.postcode = '';
  }
  if (typeof location.latitude === 'undefined') {
    return res.status(303).json({ error: 'Missing arguments latitude' });
  }
  if (typeof location.longitude === 'undefined') {
    return res.status(303).json({ error: 'Missing arguments longitude' });
  }
  return mod.editLocation(req, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error });
      return;
    }
    res.status(200).json({ message: `Location edit success ${success}` });
  });
};
