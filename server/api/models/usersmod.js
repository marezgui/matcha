import uniqid from 'uniqid';
import { db } from '../../database';

//
// ─── FORGOT PASSWORD KEY ────────────────────────────────────────────────────────
//
export const getRestoreKey = (mail, callback) => {
  const restoreKey = uniqid('restoreKey--');
  db.query('UPDATE "users" SET "restoreKey" = $2 WHERE "mail" = $1',
    [mail, restoreKey], (err) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, restoreKey);
    });
};

//
// ─── DELETE RESTORE KEY ─────────────────────────────────────────────────────────
//
export const delRestoreKey = (mail, callback) => {
  db.query('UPDATE "users" SET "restoreKey" = NULL WHERE "mail" = $1',
    [mail], (err) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, 'ok');
    });
};

//
// ─── EDIT USER PASSWORD ─────────────────────────────────────────────────────────
//
export const edituserPassword = (mail, password, callback) => {
  if (password) {
    db.query('UPDATE "users" SET "password" = $1 WHERE "mail" = $2',
      [password, mail],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

//
// ─── REQUEST RESTOREKEY POUR ACTIVER UN COMPTE UTILISATEUR ──────────────────────
//
export const checkForgotKey = (restoreKey, callback) => {
  db.query('SELECT * FROM "users" WHERE "restoreKey" = $1', [restoreKey], (err, res) => {
    let data;
    if (err.error) {
      callback(err, null);
    }
    if (res[0] === undefined) {
      data = -1;
    } else {
      data = res[0].mail;
    }
    callback(null, data);
  });
};

//
// ─── REQUEST ADD A NEW USER ────────────────────────────────────────────────────
//
export const adduser = (request, callback) => {
  const { mail, username, password, firstName, lastName } = request.body;
  const confirmkey = uniqid('confirmKey--');
  db.query('INSERT INTO "users" ("mail", "username", "password", "firstName", "lastName", "confirmKey") VALUES ($1, $2, $3, $4, $5, $6)',
    [mail, username, password, firstName, lastName, confirmkey], (err) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, confirmkey);
    });
};

//
// ─── REQUEST CHECKKEY POUR ACTIVER UN COMPTE UTILISATEUR ───────────────────────
//
export const checkkey = (confirmKey, callback) => {
  db.query('SELECT * FROM "users" WHERE "confirmKey" = $1', [confirmKey], (err, res) => {
    let data;
    if (err.error) {
      callback(err, null);
    }
    if (res[0] === undefined) {
      data = -1;
    } else {
      data = res[0].idUser;
    }
    callback(null, data);
  });
};

//
// ─── REQUEST FOR ACTIVATE AN USER ───────────────────────────────────────────────
//
export const activeuser = (idUser, callback) => {
  db.query('SELECT * FROM "users" WHERE "idUser" = $1', [idUser], (err, res) => {
    if (err.error) {
      callback(err.error, null);
    }
    if (res[0].activate === true) {
      callback('User alrady activate', null);
    } else {
      db.query('UPDATE "users" SET "activate"=true WHERE "idUser" = $1', [idUser], (err2, res2) => {
        if (err2.error) {
          callback(err2.error, null);
        } else {
          callback(null, res2);
        }
      });
    }
  });
};

//
// ─── GET USER BY MAIL ───────────────────────────────────────────────────────────
//
export const getuserbyMail = (mail, callback) => {
  db.query('SELECT * FROM "users" WHERE "mail" = $1', [mail], (err, res) => {
    if (err.error) {
      callback(err, null);
    }
    callback(null, res[0]);
  });
};

//
// ─── GET USER BLOCKER TRUE OR FALSE ─────────────────────────────────────────────
//
export const getUserBlocked = (idUser, id, callback) => {
  db.query('SELECT "blocked" FROM "blocked" WHERE ("userId" = $1 AND "blockedUserId" = $2) OR ("userId" = $2 AND "blockedUserId" = $1)',
    [idUser, id],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      if (res[0]) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
};

//
// ─── TEST USER ID FOR KNOW IS USER EXIST ────────────────────────────────────────
//
export const testUserId = (idUser, callback) => {
  db.query('SELECT * FROM "users" WHERE "idUser" = $1', [idUser], (err, res) => {
    if (err.error) {
      callback(err, null);
    }
    if (res[0]) {
      if (res[0].activate === true && res[0].userIsComplete === true) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    }
    callback(null, false);
  });
};

//
// ─── GET USER BY ID ─────────────────────────────────────────────────────────────
//
export const getuserbyIdUser = (idUser, callback) => {
  db.query('SELECT * FROM "users" WHERE "idUser" = $1', [idUser], (err, res) => {
    if (err.error) {
      callback(err, null);
    }
    callback(null, res[0]);
  });
};

//
// ─── GET USER BY USERNAME ───────────────────────────────────────────────────────
//
export const getuserbyUsername = (username, callback) => {
  db.query('SELECT * FROM "users" WHERE "username" = $1', [username], (err, res) => {
    if (err.error) {
      callback(err, null);
    }
    callback(null, res[0]);
  });
};

//
// ─── UPDATE LAST CONNEXION LOG ──────────────────────────────────────────────────
//
export const connexionLog = (mail, callback) => {
  const time = 'NOW()';
  db.query('UPDATE "users" SET "connexionLog" = $1 WHERE "mail" = $2',
    [time, mail],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, res);
    });
};

//
// ─── DEL USER ───────────────────────────────────────────────────────────────────
//
export const deluser = (idUser, callback) => {
  db.query('DELETE FROM "users" WHERE "idUser" = $1', [idUser], (err, res) => {
    if (err.error) {
      callback(err, null);
    }
    callback(null, res);
  });
};

//
// ─── GET USER TAG ───────────────────────────────────────────────────────────────
//
export const getusertag = (idUser, callback) => {
  db.query('SELECT "tag" FROM "tag" WHERE "userId" = $1', [idUser], (err, res) => {
    if (err.error) {
      callback(err, null);
    }
    callback(null, res);
  });
};

//
// ─── GET ALL TAGS ───────────────────────────────────────────────────────────────
//
export const getalltag = (callback) => {
  db.query('SELECT DISTINCT "tag" FROM "tag"', (err, res) => {
    if (err.error) {
      callback(err, null);
    }
    callback(null, res);
  });
};
