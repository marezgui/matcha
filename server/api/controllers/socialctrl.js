import util from 'util';
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

export const getUserLiked = async (req, res) => {
  const id = Number(req.params.id);

  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (resultexist === false) {
    return res.status(400).json({ error: 'User dosnt exist' });
  }
  return mod.getUserLiked(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `${success}` }); // success = true or false
  });
};

export const getUserMatche = async (req, res) => {
  const id = Number(req.params.id);

  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (resultexist === false) {
    return res.status(400).json({ error: 'User dosnt exist' });
  }
  return mod.getUserMatche(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `${success}` }); // success = true or false
  });
};

export const getUserReported = async (req, res) => {
  const id = Number(req.params.id);

  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (resultexist === false) {
    return res.status(400).json({ error: 'User dosnt exist' });
  }
  return mod.getUserReported(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `${success}` }); // success = true or false
  });
};

export const getUserBlocked = async (req, res) => {
  const id = Number(req.params.id);

  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (resultexist === false) {
    return res.status(400).json({ error: 'User dosnt exist' });
  }
  return mod.getUserBlocked(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `${success}` }); // success = true or false
  });
};

export const like = async (req, res) => {
  const id = Number(req.params.id);

  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (resultexist === false) {
    return res.status(400).json({ error: 'User dosnt exist' });
  }

  const blockedornot = util.promisify(mod.getUserBlocked);
  const blockedvalue = await blockedornot(req.user.idUser, id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (blockedvalue === true) {
    return res.status(400).json({ error: 'you have blocked this user' });
  }

  const likedornot = util.promisify(mod.getUserLiked);
  const likevalue = await likedornot(req.user.idUser, id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (likevalue === true) {
    return res.status(400).json({ error: 'you already like this user' });
  }

  const matchedornot = util.promisify(mod.getUserMatche);
  const matchevalue = await matchedornot(req.user.idUser, id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  const matchereeci = util.promisify(mod.getUserLiked);
  const likereci = await matchereeci(id, req.user.idUser).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if ((matchevalue === false) && (likereci === true)) {
    mod.createMatche(req.user.idUser, id, (err, success) => {
      if (err) {
        console.log(err);
      }
      console.log(`create matche ${success}`);
    });
  }

  mod.editLike(id, 1, (err, success) => {
    if (err) {
      console.log(err);
    }
    console.log(`add like ${success}`);
  });
  return mod.like(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `User ${id} liked ${success}` });
  });
};

export const unLike = async (req, res) => {
  const id = Number(req.params.id);

  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (resultexist === false) {
    return res.status(400).json({ error: 'User dosnt exist' });
  }

  const blockedornot = util.promisify(mod.getUserBlocked);
  const blockedvalue = await blockedornot(req.user.idUser, id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (blockedvalue === true) {
    return res.status(400).json({ error: 'you have blocked this user' });
  }

  const matchedornot = util.promisify(mod.getUserMatche);
  const matchevalue = await matchedornot(req.user.idUser, id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (matchevalue === true) {
    mod.delMatche(req.user.idUser, id, (err, success) => {
      if (err) {
        console.log(err);
      }
      console.log(`remove matche ${success}`);
    });
  }


  const likedornot = util.promisify(mod.getUserLiked);
  const likevalue = await likedornot(req.user.idUser, id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (likevalue === false) {
    return res.status(400).json({ error: 'you already unlike this user' });
  }

  mod.editLike(id, Number(-1), (err, success) => {
    if (err) {
      console.log(err);
    }
    console.log(`remove like ${success}`);
  });
  return mod.unLike(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `User ${id} unliked ${success}` });
  });
};

export const reportUser = async (req, res) => {
  const id = Number(req.params.id);

  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (resultexist === false) {
    return res.status(400).json({ error: 'User dosnt exist' });
  }

  const blockedornot = util.promisify(mod.getUserBlocked);
  const blockedvalue = await blockedornot(req.user.idUser, id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (blockedvalue === true) {
    return res.status(400).json({ error: 'you have blocked this user' });
  }

  const reportornot = util.promisify(mod.getUserReported);
  const reportvalue = await reportornot(req.user.idUser, id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (reportvalue === true) {
    return res.status(400).json({ error: 'you already report this user' });
  }

  mod.editReport(id, 1, (err, success) => {
    if (err) {
      console.log(err);
    }
    console.log(`add report ${success}`);
  });

  return mod.report(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `User ${id} report ${success}` });
  });
};

export const unReportUser = async (req, res) => {
  const id = Number(req.params.id);

  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (resultexist === false) {
    return res.status(400).json({ error: 'User dosnt exist' });
  }

  const blockedornot = util.promisify(mod.getUserBlocked);
  const blockedvalue = await blockedornot(req.user.idUser, id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (blockedvalue === true) {
    return res.status(400).json({ error: 'you have blocked this user' });
  }

  const reportornot = util.promisify(mod.getUserReported);
  const reportvalue = await reportornot(req.user.idUser, id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (reportvalue === false) {
    return res.status(400).json({ error: 'you already unreport this user' });
  }

  mod.editReport(id, Number(-1), (err, success) => {
    if (err) {
      console.log(err);
    }
    console.log(`remove report ${success}`);
  });


  return mod.unReport(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `User ${id} unreport ${success}` });
  });
};

export const blockUser = async (req, res) => {
  const id = Number(req.params.id);

  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (resultexist === false) {
    return res.status(400).json({ error: 'User dosnt exist' });
  }
  const blockedornot = util.promisify(mod.getUserBlocked);
  const blockedvalue = await blockedornot(req.user.idUser, id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (blockedvalue === true) {
    return res.status(400).json({ error: 'you already have blocked this user' });
  }

  const matchedornot = util.promisify(mod.getUserMatche);
  const matchevalue = await matchedornot(req.user.idUser, id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (matchevalue === true) {
    mod.delMatche(req.user.idUser, id, (err, success) => {
      if (err) {
        console.log(err);
      }
      console.log(`remove matche ${success}`);
    });
  }
  const likedornot = util.promisify(mod.getUserLiked);
  const likevalue = await likedornot(req.user.idUser, id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (likevalue === true) {
    mod.editLike(id, Number(-1), (err, success) => {
      if (err) {
        console.log(err);
      }
      console.log(`remove like ${success}`);
    });
    mod.unLike(req.user.idUser, id, (err, success) => {
      if (err) {
        console.log({ error: err.error });
      }
      console.log({ message: `User ${id} unliked ${success}` });
    });
  }

  const reportornot = util.promisify(mod.getUserReported);
  const reportvalue = await reportornot(req.user.idUser, id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (reportvalue === false) {
    mod.editReport(id, 1, (err, success) => {
      if (err) {
        console.log(err);
      }
      console.log(`add report ${success}`);
    });
    mod.report(req.user.idUser, id, (err, success) => {
      if (err) {
        console.log({ error: err.error });
      }
      console.log({ message: `User ${id} report ${success}` });
    });
  }

  return mod.blockUser(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `User ${id} blocked ${success}` });
  });
};

export const unBlockUser = async (req, res) => {
  const id = Number(req.params.id);

  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (resultexist === false) {
    return res.status(400).json({ error: 'User dosnt exist' });
  }
  const blockedornot = util.promisify(mod.getUserBlocked);
  const blockedvalue = await blockedornot(req.user.idUser, id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (blockedvalue === false) {
    return res.status(400).json({ error: 'you already have unblocked this user' });
  }

  const reportornot = util.promisify(mod.getUserReported);
  const reportvalue = await reportornot(req.user.idUser, id).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });

  if (reportvalue === false) {
    mod.editReport(id, -1, (err, success) => {
      if (err) {
        console.log(err);
      }
      console.log(`add report ${success}`);
    });
    mod.unReport(req.user.idUser, id, (err, success) => {
      if (err) {
        console.log({ error: err.error });
      }
      console.log({ message: `User ${id} unreport ${success}` });
    });
  }

  return mod.unBlockUser(req.user.idUser, id, (err, success) => {
    if (err) {
      res.status(400).json({ error: err.error }); return;
    }
    res.status(200).json({ message: `User ${id} unblocked ${success}` });
  });
};

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
