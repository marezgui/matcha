/* eslint-disable prefer-destructuring */
import util from 'util';
import geolib from 'geolib';
import * as mod from '../models/socialmod';
import { likeNotif, unlikeNotif, matcheNotif } from './notifchatctrl';
// eslint-disable-next-line import/no-cycle
import { io } from '../../server';

//
// ─── GET LIST OF BLOCKED USERS ──────────────────────────────────────────────────
//
export const getUserBlockedList = async (req, res) => {
  if (req.user.userIsComplete === false) {
    res.status(303).json({ error: 'Complete your profile first.' });
    return;
  }
  const { user } = req;
  const blockedornot = util.promisify(mod.getUserBlockedList);
  const blockedTab = await blockedornot(user.idUser).then(datablock => datablock).catch(err => err);// { console.log(`[Error]: ${err}`); });
  res.status(200).json({ blockedTab });
};

//
// ─── GET USERS VAL FOR SEARCH ───────────────────────────────────────────────────
//
export const getUserAgeDistanceScoreReport = async (req, res) => {
  if (req.user.userIsComplete === false) {
    res.status(303).json({ error: 'Complete your profile first.' });
    return;
  }
  const { user } = req;
  const userdata = util.promisify(mod.getUsersVal);
  const data = await userdata(user).then(datauser => datauser).catch(err => err);// { console.log(`[Error]: ${err}`); });
  let scoreMin = null;
  let scoreMax = null;
  let distanceMin = null;
  let distanceMax = null;
  let ageMin = null;
  let ageMax = null;
  let reportMin = null;
  let reportMax = null;
  let c = 0;
  const blockedornot = util.promisify(mod.getUserBlockedList);
  const blockedTab = await blockedornot(user.idUser).then(datablock => datablock).catch(err => err);// { console.log(`[Error]: ${err}`); });
  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < blockedTab.length; j += 1) {
      if (blockedTab[j].blockedUserId === data[i].idUser) {
        c = 1;
      } else if ((blockedTab[j].userId === data[i].idUser)) {
        c = 1;
      }
    }
    if (c !== 0) {
      c = 0;
      continue;
    }
    let distance = await geolib.getDistanceSimple(
      { latitude: data[i].location.latitude, longitude: data[i].location.longitude },
      { latitude: user.location.latitude, longitude: user.location.longitude }, { unit: 'm' }
    );
    distance /= 1000;
    const userAge = data[i].age;
    scoreMin = scoreMin === null ? data[i].score : scoreMin;
    scoreMax = scoreMax === null ? data[i].score : scoreMax;
    distanceMin = distanceMin === null ? distance : distanceMin;
    distanceMax = distanceMax === null ? distance : distanceMax;
    ageMin = ageMin === null ? userAge : ageMin;
    ageMax = ageMax === null ? userAge : ageMax;
    reportMin = reportMin === null ? data[i].report : reportMin;
    reportMax = reportMax === null ? data[i].report : reportMax;
    scoreMin = scoreMin > data[i].score ? data[i].score : scoreMin;
    scoreMax = scoreMax < data[i].score ? data[i].score : scoreMax;
    distanceMin = distanceMin > distance ? distance : distanceMin;
    distanceMax = distanceMax < distance ? distance : distanceMax;
    ageMin = ageMin > userAge ? userAge : ageMin;
    ageMax = ageMax < userAge ? userAge : ageMax;
    reportMin = reportMin > data[i].report ? data[i].report : reportMin;
    reportMax = reportMax < data[i].report ? data[i].report : reportMax;
  }

  scoreMin = scoreMin === null ? 0 : scoreMin;
  scoreMax = scoreMax === null ? 0 : scoreMax;
  distanceMin = distanceMin === null ? 0 : distanceMin;
  distanceMax = distanceMax === null ? 0 : distanceMax;
  ageMin = ageMin === null ? 0 : ageMin;
  ageMax = ageMax === null ? 0 : ageMax;
  reportMin = reportMin === null ? 0 : reportMin;
  reportMax = reportMax === null ? 0 : reportMax;

  res.status(200).json({ scoreMin,
    scoreMax,
    distanceMin,
    distanceMax,
    ageMin,
    ageMax,
    reportMin,
    reportMax });
};

//
// ─── GET USERS VAL FOR SEARCH FUNCTION ──────────────────────────────────────────
//
export const getUserAgeDistanceScoreReportFct = async (req) => {
  const { user } = req;
  const userdata = util.promisify(mod.getUsersVal);
  const data = await userdata(user).then(datauser => datauser).catch(err => err);
  let scoreMin = null;
  let scoreMax = null;
  let distanceMin = null;
  let distanceMax = null;
  let ageMin = null;
  let ageMax = null;
  let reportMin = null;
  let reportMax = null;
  let c = 0;
  const blockedornot = util.promisify(mod.getUserBlockedList);
  const blockedTab = await blockedornot(user.idUser).then(datablock => datablock).catch(err => err);
  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < blockedTab.length; j += 1) {
      if (blockedTab[j].blockedUserId === data[i].idUser) {
        c = 1;
      } else if ((blockedTab[j].userId === data[i].idUser)) {
        c = 1;
      }
    }
    if (c !== 0) {
      c = 0;
      continue;
    }
    let distance = await geolib.getDistanceSimple(
      { latitude: data[i].location.latitude, longitude: data[i].location.longitude },
      { latitude: user.location.latitude, longitude: user.location.longitude }, { unit: 'm' }
    );
    distance /= 1000;
    const userAge = data[i].age;
    scoreMin = scoreMin === null ? data[i].score : scoreMin;
    scoreMax = scoreMax === null ? data[i].score : scoreMax;
    distanceMin = distanceMin === null ? distance : distanceMin;
    distanceMax = distanceMax === null ? distance : distanceMax;
    ageMin = ageMin === null ? userAge : ageMin;
    ageMax = ageMax === null ? userAge : ageMax;
    reportMin = reportMin === null ? data[i].report : reportMin;
    reportMax = reportMax === null ? data[i].report : reportMax;
    scoreMin = scoreMin > data[i].score ? data[i].score : scoreMin;
    scoreMax = scoreMax < data[i].score ? data[i].score : scoreMax;
    distanceMin = distanceMin > distance ? distance : distanceMin;
    distanceMax = distanceMax < distance ? distance : distanceMax;
    ageMin = ageMin > userAge ? userAge : ageMin;
    ageMax = ageMax < userAge ? userAge : ageMax;
    reportMin = reportMin > data[i].report ? data[i].report : reportMin;
    reportMax = reportMax < data[i].report ? data[i].report : reportMax;
  }

  scoreMin = scoreMin === null ? 0 : scoreMin;
  scoreMax = scoreMax === null ? 0 : scoreMax;
  distanceMin = distanceMin === null ? 0 : distanceMin;
  distanceMax = distanceMax === null ? 0 : distanceMax;
  ageMin = ageMin === null ? 0 : ageMin;
  ageMax = ageMax === null ? 0 : ageMax;
  reportMin = reportMin === null ? 0 : reportMin;
  reportMax = reportMax === null ? 0 : reportMax;

  const value = { scoreMin,
    scoreMax,
    distanceMin,
    distanceMax,
    ageMin,
    ageMax,
    reportMin,
    reportMax };
  return value;
};

//
// ─── GET USER LIKED TRUE FALSE ──────────────────────────────────────────────────
//
export const getUserLiked = async (req, res) => {
  if (req.user.userIsComplete === false) {
    return res.status(303).json({ error: 'Complete your profile first.' });
  }
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(303).json({ error: 'Id must be a number' });
  }
  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (resultexist === false) {
    return res.status(303).json({ error: 'User dosnt exist' });
  }
  return mod.getUserLiked(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `${success}` }); // success = true or false
  });
};

//
// ─── GET ALL USER MATCHE ────────────────────────────────────────────────────────
//
export const getAllUserMatche = async (req, res) => {
  mod.getAllUserMatche(req.user.idUser, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error }); return;
    }
    const result = [];
    for (let i = 0; i < success.length; i += 1) {
      result.push(Number(success[i].idMatche));
    }
    res.status(200).json({ result }); // return a tab
  });
};

//
// ─── GET ALL USER MATCHE MORE ───────────────────────────────────────────────────
//
export const getAllUserMatcheMore = async (req, res) => {
  const id = Number(req.params.matcheid);
  if (isNaN(id)) {
    res.status(303).json({ error: 'matcheId must be a number' });
    return;
  }
  mod.getAllUserMatcheMore(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error }); return;
    }
    let usermatche;
    if (success[0].userId1 === req.user.idUser) { usermatche = success[0].userId2; } else { usermatche = success[0].userId1; }
    res.status(200).json({ usermatche }); // return a tab
  });
};

//
// ─── GET USER MATCHE TRUE FALSE ─────────────────────────────────────────────────
//
export const getUserMatche = async (req, res) => {
  if (req.user.userIsComplete === false) {
    return res.status(303).json({ error: 'Complete your profile first.' });
  }
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(303).json({ error: 'Id must be a number' });
  }
  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (resultexist === false) {
    return res.status(303).json({ error: 'User dosnt exist' });
  }
  return mod.getUserMatche(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `${success}` }); // success = true or false
  });
};

//
// ─── GET USER REPORTED TRUE FALSE ───────────────────────────────────────────────
//
export const getUserReported = async (req, res) => {
  if (req.user.userIsComplete === false) {
    return res.status(303).json({ error: 'Complete your profile first.' });
  }
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(303).json({ error: 'Id must be a number' });
  }
  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (resultexist === false) {
    return res.status(303).json({ error: 'User dosnt exist' });
  }
  return mod.getUserReported(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `${success}` }); // success = true or false
  });
};

//
// ─── GET USER BLOCKED TRUE FALSE ────────────────────────────────────────────────
//
export const getUserBlocked = async (req, res) => {
  if (req.user.userIsComplete === false) {
    return res.status(303).json({ error: 'Complete your profile first.' });
  }
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(303).json({ error: 'Id must be a number' });
  }
  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (resultexist === false) {
    return res.status(303).json({ error: 'User dosnt exist' });
  }
  return mod.getUserBlocked(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `${success}` }); // success = true or false
  });
};

//
// ─── LIKE USER ──────────────────────────────────────────────────────────────────
//
export const like = async (req, res) => {
  if (req.user.userIsComplete === false) {
    return res.status(303).json({ error: 'Complete your profile first.' });
  }
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(303).json({ error: 'Id must be a number' });
  }
  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (resultexist === false) {
    return res.status(303).json({ error: 'User dosnt exist' });
  }
  const blockedornot = util.promisify(mod.getUserBlocked);
  const blockedvalue = await blockedornot(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (blockedvalue === true) {
    return res.status(303).json({ error: 'you have blocked this user' });
  }
  const likedornot = util.promisify(mod.getUserLiked);
  const likevalue = await likedornot(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (likevalue === true) {
    return res.status(303).json({ error: 'you already like this user' });
  }
  const matchedornot = util.promisify(mod.getUserMatche);
  const matchevalue = await matchedornot(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  const matchereeci = util.promisify(mod.getUserLiked);
  const likereci = await matchereeci(id, req.user.idUser).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if ((matchevalue === false) && (likereci === true)) {
    const createMatche = util.promisify(mod.createMatche);
    await createMatche(req.user.idUser, id).then().catch(err => err);// { console.log(`[Error]: ${err}`); });
    const getIdMatche = util.promisify(mod.getIdMatche);
    const idMatche = await getIdMatche(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
    io.emit('NEW-MATCHE', idMatche, req.user.idUser, id); // ----> il faut que tu regarde cet event
    //  console.log(`idmatche new : ${idMatche}`);
    matcheNotif(req.user.idUser, id);
  //  console.log(`remove like ${success}`)
  }
  mod.editLike(id, 1, (err, success) => {
    if (err) {
      //    console.log(err);
    }
    likeNotif(req.user.idUser, id);
  //  console.log(`add like ${success}`);
  });
  return mod.like(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `User ${id} liked ${success}` });
  });
};

//
// ─── UNLIKE USER ────────────────────────────────────────────────────────────────
//
export const unLike = async (req, res) => {
  if (req.user.userIsComplete === false) {
    return res.status(303).json({ error: 'Complete your profile first.' });
  }
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(303).json({ error: 'Id must be a number' });
  }
  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (resultexist === false) {
    return res.status(303).json({ error: 'User dosnt exist' });
  }
  const blockedornot = util.promisify(mod.getUserBlocked);
  const blockedvalue = await blockedornot(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (blockedvalue === true) {
    return res.status(303).json({ error: 'you have blocked this user' });
  }
  const matchedornot = util.promisify(mod.getUserMatche);
  const matchevalue = await matchedornot(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (matchevalue === true) {

    const getIdMatche = util.promisify(mod.getIdMatche);
    const idMatche = await getIdMatche(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
    io.emit('REMOVE-MATCHE', idMatche, req.user.idUser, id); // ----> il faut que tu regarde cet event

    const delNewMessageNotif = util.promisify(mod.delNewMessageNotif);
    await delNewMessageNotif(req.user.idUser, id).then(data => data).catch(err => err);

    //   console.log(`idmatche remove : ${idMatche}`);
    mod.delMatche(req.user.idUser, id, (err, success) => {
      if (err) {
        //    console.log(err);
      }
      // console.log(`remove matche ${success}`);
    });

  }
  const likedornot = util.promisify(mod.getUserLiked);
  const likevalue = await likedornot(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (likevalue === false) {
    return res.status(303).json({ error: 'you already unlike this user' });
  }
  mod.editLike(id, Number(-1), (err, success) => {
    if (err) {
      //    console.log(err);
    }
  });
  unlikeNotif(req.user.idUser, id);
  //  console.log(`remove like ${success}`);
  return mod.unLike(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `User ${id} unliked ${success}` });
  });
};

//
// ─── REPORT USER ────────────────────────────────────────────────────────────────
//
export const reportUser = async (req, res) => {
  if (req.user.userIsComplete === false) {
    return res.status(303).json({ error: 'Complete your profile first.' });
  }
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(303).json({ error: 'Id must be a number' });
  }
  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (resultexist === false) {
    return res.status(303).json({ error: 'User dosnt exist' });
  }
  const blockedornot = util.promisify(mod.getUserBlocked);
  const blockedvalue = await blockedornot(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (blockedvalue === true) {
    return res.status(303).json({ error: 'you have blocked this user' });
  }
  const reportornot = util.promisify(mod.getUserReported);
  const reportvalue = await reportornot(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (reportvalue === true) {
    return res.status(303).json({ error: 'you already report this user' });
  }
  mod.editReport(id, 1, (err, success) => {
    if (err) {
      //    console.log(err);
    }
  //  console.log(`add report ${success}`);
  });
  return mod.report(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `User ${id} report ${success}` });
  });
};

//
// ─── UNREPORT USER ──────────────────────────────────────────────────────────────
//
export const unReportUser = async (req, res) => {
  if (req.user.userIsComplete === false) {
    return res.status(303).json({ error: 'Complete your profile first.' });
  }
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(303).json({ error: 'Id must be a number' });
  }
  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (resultexist === false) {
    return res.status(303).json({ error: 'User dosnt exist' });
  }
  const blockedornot = util.promisify(mod.getUserBlocked);
  const blockedvalue = await blockedornot(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (blockedvalue === true) {
    return res.status(303).json({ error: 'you have blocked this user' });
  }
  const reportornot = util.promisify(mod.getUserReported);
  const reportvalue = await reportornot(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (reportvalue === false) {
    return res.status(303).json({ error: 'you already unreport this user' });
  }
  mod.editReport(id, Number(-1), (err, success) => {
    if (err) {
      //   console.log(err);
    }
  //  console.log(`remove report ${success}`);
  });
  return mod.unReport(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `User ${id} unreport ${success}` });
  });
};

//
// ─── BLOCK USER ─────────────────────────────────────────────────────────────────
//
export const blockUser = async (req, res) => {
  if (req.user.userIsComplete === false) {
    return res.status(303).json({ error: 'Complete your profile first.' });
  }
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(303).json({ error: 'Id must be a number' });
  }
  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (resultexist === false) {
    return res.status(303).json({ error: 'User dosnt exist' });
  }
  const blockedornot = util.promisify(mod.getUserBlocked);
  const blockedvalue = await blockedornot(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (blockedvalue === true) {
    return res.status(303).json({ error: 'you already have blocked this user' });
  }
  const matchedornot = util.promisify(mod.getUserMatche);
  const matchevalue = await matchedornot(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (matchevalue === true) {

    const getIdMatche = util.promisify(mod.getIdMatche);
    const idMatche = await getIdMatche(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
    io.emit('REMOVE-MATCHE', idMatche, req.user.idUser, id); // ----> il faut que tu regarde cet event
    // console.log(`idmatche remove : ${idMatche}`);

    const delNewMessageNotif = util.promisify(mod.delNewMessageNotif);
    await delNewMessageNotif(req.user.idUser, id).then(data => data).catch(err => err);

    mod.delMatche(req.user.idUser, id, (err, success) => {
      if (err) {
        //    console.log(err);
      }
    //  console.log(`remove matche ${success}`);
    });
    unlikeNotif(req.user.idUser, id);
    //  console.log(`remove like ${success}`);
  }
  const likedornot = util.promisify(mod.getUserLiked);
  const likevalue = await likedornot(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (likevalue === true) {
    mod.editLike(id, Number(-1), (err, success) => {
      if (err) {
        //    console.log(err);
      }
      //   console.log(`remove like ${success}`);
    });
    mod.unLike(req.user.idUser, id, (err, success) => {
      if (err) {
        //    console.log({ error: err.error });
      }
    // console.log({ message: `User ${id} unliked ${success}` });
    });
  }
  const reportornot = util.promisify(mod.getUserReported);
  const reportvalue = await reportornot(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (reportvalue === false) {
    mod.editReport(id, 1, (err, success) => {
      if (err) {
        //   console.log(err);
      }
      // console.log(`add report ${success}`);
    });
    mod.report(req.user.idUser, id, (err, success) => {
      if (err) {
      //  console.log({ error: err.error });
      }
      // console.log({ message: `User ${id} report ${success}` });
    });
  }

  io.emit('BLOCK-USER', req.user.idUser, id); // ----> il faut que tu regarde cet event

  return mod.blockUser(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `User ${id} blocked ${success}` });
  });
};

//
// ─── UNBLOCK USER ───────────────────────────────────────────────────────────────
//
export const unBlockUser = async (req, res) => {
  if (req.user.userIsComplete === false) {
    return res.status(303).json({ error: 'Complete your profile first.' });
  }
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(303).json({ error: 'Id must be a number' });
  }
  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (resultexist === false) {
    return res.status(303).json({ error: 'User dosnt exist' });
  }
  const blockedornot = util.promisify(mod.getUserBlocked);
  const blockedvalue = await blockedornot(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (blockedvalue === false) {
    return res.status(303).json({ error: 'you already have unblocked this user' });
  }
  const reportornot = util.promisify(mod.getUserReported);
  const reportvalue = await reportornot(req.user.idUser, id).then(data => data).catch(err => err);// { console.log(`[Error]: ${err}`); });
  if (reportvalue === false) {
    mod.editReport(id, -1, (err, success) => {
      if (err) {
        //    console.log(err);
      }
    //  console.log(`remove report ${success}`);
    });
    mod.unReport(req.user.idUser, id, (err, success) => {
      if (err) {
      //  console.log({ error: err.error });
      }
    // console.log({ message: `User ${id} unreport ${success}` });
    });

    io.emit('UNBLOCK-USER', req.user.idUser, id); // ----> il faut que tu regarde cet event

  }
  return mod.unBlockUser(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(303).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `User ${id} unblocked ${success}` });
  });
};

//
// ─── FONCTION MATCHE AVEC ET SANS TAG ───────────────────────────────────────────
//

/*
  la fonction return un json :
    {
      users : [
        1 : { userData },
        2 : { userData },
        ...
      ],
      start: valeurDuProchainStart
    }
    si il n'y a plus d'users la fonction renvoi :
    {
      users : [],
      start: valeurDuProchainStart
    }

    la fonction accepte les param :
    count, start,
    ageMin, ageMax,
    distanceMin, distanceMax,
    scoreMin, scoreMax,
    tag,
    trie, order.

    trie = "distance" ou "age" ou "score" ou "tag"
    order = 0 -> croissant  1 -> decroissant
    les tags sont separer par une virgule tags -> test1,test2 tag,test etc...
*/

//
// ─── GET USER PROFILE ───────────────────────────────────────────────────────────
//
const getUserProfile = async (tmpUsers, start, count, res) => {
  let newStart = start;
  const resultData = { users: [] };
  let cpt = 0;
  const getUserFunction = util.promisify(mod.getuserbyIdUser);

  for (let j = start; j < tmpUsers.length; j += 1) {
    if (cpt >= count) { break; }

    const getUser = await getUserFunction(tmpUsers[j]).then(datauser => datauser).catch(err => err);
    if (getUser === undefined) { continue; }

    resultData.users.push(getUser);
    cpt += 1;
    newStart += 1;
  }
  resultData.newStart = newStart;
  return res.status(200).json({ resultData });
};

//
// ─── GET USER FOR ME WITH TAG ───────────────────────────────────────────────────
//
const getUserwithTags = async (user,
  genre, orientation,
  ageMin, ageMax,
  distanceMin, distanceMax,
  scoreMin, scoreMax,
  tags,
  trie, order,
  count, start,
  res) => {

  let c = 0;
  let tmpUsers = [];

  const blockedornot = util.promisify(mod.getUserBlockedList);
  const blockedTab = await blockedornot(user.idUser).then(datablock => datablock).catch(err => err);

  const getUserFct = util.promisify(mod.getUsersForMe);
  let getUser;

  if (trie === 'distance' || trie === 'tag') {
    getUser = await getUserFct(user.idUser, genre, orientation, scoreMin, scoreMax,
      ageMin, ageMax, 'score', order).then(datauser => datauser).catch(err => err);
  } else {
    getUser = await getUserFct(user.idUser, genre, orientation, scoreMin, scoreMax,
      ageMin, ageMax, trie, order).then(datauser => datauser).catch(err => err);
  }
  const getTags = util.promisify(mod.getTagOfUsers);
  for (let i = 0; i < getUser.length; i += 1) {

    const taglistuser = await getTags(getUser[i].idUser).then(datablock => datablock).catch(err => err);// { console.log(`[Error]: ${err}`); });
    if (taglistuser[0] === undefined) { continue; }

    c = 1;
    for (let k = 0; k < taglistuser.length; k += 1) {
      for (let l = 0; l < tags.length; l += 1) {
        if (taglistuser[k].tag === tags[l]) {
          c = 0;
        }
      }
    }

    if (getUser[i] === undefined) {
      break;
    }
    for (let j = 0; j < blockedTab.length; j += 1) {
      if (blockedTab[j].blockedUserId === getUser[i].idUser
            || blockedTab[j].userId === getUser[i].idUser) {
        c = 1;
        break;
      }
    }
    if (c === 1) {
      c = 0;
      continue;
    }
    let distance = await geolib.getDistanceSimple(
      { latitude: getUser[i].location.latitude, longitude: getUser[i].location.longitude },
      { latitude: user.location.latitude, longitude: user.location.longitude }, { unit: 'm' }
    );
    distance /= 1000;

    getUser[i].distance = distance;
    if (getUser[i].distance < distanceMin || getUser[i].distance > distanceMax) {
      continue;
    }

    let tagofuser = '';

    for (let k = 0; k < taglistuser.length; k += 1) {
      if (k !== 0) { tagofuser += ', '; }
      tagofuser += taglistuser[k].tag;
    }

    tmpUsers.push([getUser[i].idUser, distance, tagofuser]);
  }
  if (trie === 'distance') {
    if (order === 'ASC') {
      tmpUsers = tmpUsers.sort((a, b) => {
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
        return 0;
      });
    } else {
      tmpUsers = tmpUsers.sort((a, b) => {
        if (a[1] < b[1]) return 1;
        if (a[1] > b[1]) return -1;
        return 0;
      });
    }
  } else if (trie === 'tag') {
    if (order === 'ASC') {
      tmpUsers = tmpUsers.sort((a, b) => {
        if (a[2] < b[2]) return -1;
        if (a[2] > b[2]) return 1;
        return 0;
      });
    } else {
      tmpUsers = tmpUsers.sort((a, b) => {
        if (a[2] < b[2]) return 1;
        if (a[2] > b[2]) return -1;
        return 0;
      });
    }
  }
  console.log(tmpUsers);
  const resultUser = [];
  for (let j = 0; j < tmpUsers.length; j += 1) {
    resultUser.push(tmpUsers[j][0]);
  }
  return getUserProfile(resultUser, start, count, res);
};

//
// ─── GET USER FOR ME NO TAG ─────────────────────────────────────────────────────
//
const getUserNoTags = async (user,
  genre, orientation,
  ageMin, ageMax,
  distanceMin, distanceMax,
  scoreMin, scoreMax,
  trie, order,
  count, start,
  res) => {

  let c = 0;
  let tmpUsers = [];

  const blockedornot = util.promisify(mod.getUserBlockedList);
  const blockedTab = await blockedornot(user.idUser).then(datablock => datablock).catch(err => err);

  const getUserFct = util.promisify(mod.getUsersForMe);
  let getUser;

  if (trie === 'distance') {
    getUser = await getUserFct(user.idUser, genre, orientation, scoreMin, scoreMax,
      ageMin, ageMax, 'score', order).then(datauser => datauser).catch(err => err);
  } else {
    getUser = await getUserFct(user.idUser, genre, orientation, scoreMin, scoreMax,
      ageMin, ageMax, trie, order).then(datauser => datauser).catch(err => err);
  }
  for (let i = 0; i < getUser.length; i += 1) {
    if (getUser[i] === undefined) {
      break;
    }
    for (let j = 0; j < blockedTab.length; j += 1) {
      if (blockedTab[j].blockedUserId === getUser[i].idUser
          || blockedTab[j].userId === getUser[i].idUser) {
        c = 1;
        break;
      }
    }
    if (c === 1) {
      c = 0;
      continue;
    }
    let distance = await geolib.getDistanceSimple(
      { latitude: getUser[i].location.latitude, longitude: getUser[i].location.longitude },
      { latitude: user.location.latitude, longitude: user.location.longitude }, { unit: 'm' }
    );
    distance /= 1000;

    getUser[i].distance = distance;
    if (getUser[i].distance < distanceMin || getUser[i].distance > distanceMax) {
      continue;
    }
    tmpUsers.push([getUser[i].idUser, distance]);
  }
  if (trie === 'distance') {
    if (order === 'ASC') {
      tmpUsers = tmpUsers.sort((a, b) => {
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
        return 0;
      });
    } else {
      tmpUsers = tmpUsers.sort((a, b) => {
        if (a[1] < b[1]) return 1;
        if (a[1] > b[1]) return -1;
        return 0;
      });
    }
  }
  const resultUser = [];
  for (let j = 0; j < tmpUsers.length; j += 1) {
    resultUser.push(tmpUsers[j][0]);
  }
  return getUserProfile(resultUser, start, count, res);
};

//
// ─── GET USER FOR ME ────────────────────────────────────────────────────────────
//
export const getUsersForMe = async (req, res) => {
  const { user } = req;
  let { genre, orientation } = user;
  let { ageMin, ageMax,
    distanceMin, distanceMax,
    scoreMin, scoreMax,
    tags,
    trie, order } = req.body;
  let { count, start } = req.params;

  if (user.userIsComplete === false) {
    return res.status(303).json({ error: 'Complete your profile first.' });
  }

  if (isNaN(count)) {
    return res.status(303).json({ error: 'count must be a number' });
  } if (count === undefined) { count = 25; }
  count = Number(count);

  if (isNaN(start)) {
    return res.status(303).json({ error: 'start must be a number' });
  } if (start === undefined) { start = 0; }
  start = Number(start);

  if (ageMin !== undefined && isNaN(ageMin)) {
    return res.status(303).json({ error: 'age min must be a number' });
  } if (ageMin === undefined) {
    ageMin = 0;
  }
  if (ageMax !== undefined && isNaN(ageMax)) {
    return res.status(303).json({ error: 'age max must be a number' });
  }

  order = Number(order);
  if (order === 0) {
    order = 'ASC';
  } else {
    order = 'DESC';
  }

  if (trie === undefined) {
    trie = 'score';
  } else if (trie !== 'age' && trie !== 'distance' && trie !== 'score' && trie !== 'tag') {
    return res.status(303).json({ error: 'Sort must be equal to age or dictance or score or tag' });
  } else if (trie === 'age') {
    trie = 'dateOfBirth';
  }

  if (genre === 'O') {
    genre = 'BI';
  }
  if (orientation === 'BI') {
    orientation = 'O';
  }

  if (scoreMin !== undefined && isNaN(scoreMin)) {
    return res.status(303).json({ error: 'score min must be a number' });
  } if (scoreMin === undefined) {
    scoreMin = 0;
  }
  if (scoreMax !== undefined && isNaN(scoreMax)) {
    return res.status(303).json({ error: 'score max must be a number' });
  }

  if (distanceMin !== undefined && isNaN(distanceMin)) {
    return res.status(303).json({ error: 'distance min must be a number' });
  } if (distanceMin === undefined) {
    distanceMin = 0;
  }
  if (distanceMax !== undefined && isNaN(distanceMax)) {
    return res.status(303).json({ error: 'distance max must be a number' });
  }

  if (distanceMax === undefined || scoreMax === undefined || ageMax === undefined
    || distanceMax === null || scoreMax === null || ageMax === null) {
    const userval = await getUserAgeDistanceScoreReportFct(req);
    if (scoreMax === undefined || scoreMax === null) {
      scoreMax = userval.scoreMax;
    }
    if (distanceMax === undefined || distanceMax === null) {
      distanceMax = userval.distanceMax;
    }
    if (ageMax === undefined || ageMax === null) {
      ageMax = userval.ageMax;
    }
  }
  if (tags === undefined || tags === []) {
    tags = null;
  } else if (tags[0] !== undefined) { // tags = tags.split(',');
    return getUserwithTags(user,
      genre, orientation,
      ageMin, ageMax,
      distanceMin, distanceMax,
      scoreMin, scoreMax,
      tags,
      trie, order,
      count, start,
      res);
  }

  if (trie === 'tag') {
    return res.status(303).json({ error: 'you can not sort by tag if you do not put tags' });
  }
  return getUserNoTags(user,
    genre, orientation,
    ageMin, ageMax,
    distanceMin, distanceMax,
    scoreMin, scoreMax,
    trie, order,
    count, start,
    res);
};
