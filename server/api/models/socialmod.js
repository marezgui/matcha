import { db } from '../../database';
// AND "users"."activate" = true AND "users"."userIsComplete" = true

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
// ─── GET USER VALUES FOR SEARCHING MATCHE ───────────────────────────────────────
//
export const getUsersVal = (user, callback) => {
  let { genre, orientation } = user;
  const { idUser } = user;
  if (genre === 'O') {
    genre = 'BI';
  }
  if (orientation === 'BI') {
    orientation = 'O';
  }
  db.query('SELECT * FROM "users" where "users"."orientation" = $1 AND "users"."genre" = $2 AND  "users"."idUser" != $3 AND "users"."activate" = true AND "users"."userIsComplete" = true',
    [genre, orientation, idUser],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, res);
    });
};

//
// ─── GET USER FOR ME MATCHE FUNCTION ────────────────────────────────────────────
//
export const getUsersForMe = (user, scoreMin, scoreMax, count, start, callback) => {
  let { genre, orientation } = user;
  const { idUser } = user;
  if (genre === 'O') {
    genre = 'BI';
  }
  if (orientation === 'BI') {
    orientation = 'O';
  }
  db.query('SELECT * FROM "users" where "users"."orientation" = $1 AND "users"."genre" = $2 AND "users"."score" >= $3 AND "users"."score" <= $4 AND "users"."idUser" != $5 AND "users"."activate" = true AND "users"."userIsComplete" = true LIMIT $6 OFFSET $7',
    [genre, orientation, scoreMin, scoreMax, idUser, count, start],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, res);
    });
};

//
// ─── GET TAGS OF USER ───────────────────────────────────────────────────────────
//
export const getTagOfUsers = (id, tag, callback) => {
  db.query('SELECT "tag"."userId" FROM "tag" WHERE "tag" = $1 AND "userId" != $2', [tag, id], (err, res) => {
    if (err.error) {
      callback(err, null);
    }
    callback(null, res);
  });
};

//
// ─── TEST USER ID ───────────────────────────────────────────────────────────────
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
// ─── LIKE REQUEST ───────────────────────────────────────────────────────────────
//
export const like = (idUser, id, callback) => {
  db.query('INSERT INTO "likes" ("userId", "likedUserId") VALUES ($1, $2)',
    [idUser, id],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, `ok ${res}`);
    });
};

//
// ─── LIKE REQUEST ───────────────────────────────────────────────────────────────
//
export const unLike = (idUser, id, callback) => {
  db.query('DELETE FROM "likes" WHERE "userId" = $1 AND "likedUserId" = $2',
    [idUser, id],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, `ok ${res}`);
    });
};

//
// ─── REPORT USER REQUEST ────────────────────────────────────────────────────────
//
export const report = (idUser, id, callback) => {
  db.query('INSERT INTO "report" ("userId", "reportedUserId") VALUES ($1, $2)',
    [idUser, id],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, `ok ${res}`);
    });
};

//
// ─── UNREPORT USER REQUEST ──────────────────────────────────────────────────────
//
export const unReport = (idUser, id, callback) => {
  db.query('DELETE FROM "report" WHERE "userId" = $1 AND "reportedUserId" = $2',
    [idUser, id],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, `ok ${res}`);
    });
};

//
// ─── EDIT LIKE VAL ──────────────────────────────────────────────────────────────
//
export const editLike = (id, val, callback) => {
  const value = Number(val);
  db.query('SELECT "users"."score" FROM "users" WHERE "idUser" = $1', [id],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      let { score } = res[0];
      score += value;
      db.query('UPDATE "users" SET "score" = $1 WHERE "idUser" = $2', [score, id],
        (err2, res2) => {
          if (err2.error) {
            callback(err2, null);
          }
          callback(null, `ok ${res2}`);
        });

    });
};

//
// ─── EDIT REPORT VAL ────────────────────────────────────────────────────────────
//
export const editReport = (id, val, callback) => {
  const value = Number(val);
  db.query('SELECT "users"."report" FROM "users" WHERE "idUser" = $1', [id],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      let reportval = res[0].report;
      reportval += value;
      db.query('UPDATE "users" SET "report" = $1 WHERE "idUser" = $2', [reportval, id],
        (err2, res2) => {
          if (err2.error) {
            callback(err2, null);
          }
          callback(null, `ok ${res2}`);
        });

    });
};

//
// ─── BLOCK USER ─────────────────────────────────────────────────────────────────
//
export const blockUser = (idUser, id, callback) => {
  db.query('INSERT INTO "blocked" ("userId", "blockedUserId") VALUES ($1, $2)',
    [idUser, id],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, `ok ${res}`);
    });
};

//
// ─── UNBLOCK USER ───────────────────────────────────────────────────────────────
//
export const unBlockUser = (idUser, id, callback) => {
  db.query('DELETE FROM "blocked" WHERE "userId" = $1 AND "blockedUserId" = $2',
    [idUser, id],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, `ok ${res}`);
    });
};

//
// ─── GET USER LIKE ──────────────────────────────────────────────────────────────
//
export const getUserLiked = (idUser, id, callback) => {
  db.query('SELECT "likes" FROM "likes" WHERE "userId" = $1 AND "likedUserId" = $2',
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
// ─── GET USER REPORT ────────────────────────────────────────────────────────────
//
export const getUserReported = (idUser, id, callback) => {
  db.query('SELECT "report" FROM "report" WHERE "userId" = $1 AND "reportedUserId" = $2',
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
// ─── GET USER BLOCKED LIST ──────────────────────────────────────────────────────
//
export const getUserBlockedList = (idUser, callback) => {
  db.query('SELECT * FROM "blocked" WHERE "userId" = $1 OR "blockedUserId" = $1',
    [idUser],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, res);
    });
};

//
// ─── GET USER BLOCKED ───────────────────────────────────────────────────────────
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
// ─── GET ALL USER MATCHE ────────────────────────────────────────────────────────
//
export const getAllUserMatche = (idUser, callback) => {
  db.query('SELECT "matche"."idMatche" FROM "matche" WHERE "userId1" = $1 OR "userId2" = $1',
    [idUser],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, res);
    });
};

//
// ─── GET USER MATCHE ────────────────────────────────────────────────────────────
//
export const getUserMatche = (idUser, id, callback) => {
  db.query('SELECT "matche" FROM "matche" WHERE ("userId1" = $1 AND "userId2" = $2) OR ("userId1" = $2 AND "userId2" = $1)',
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
// ─── CREATE MATCHE ──────────────────────────────────────────────────────────────
//
export const createMatche = (idUser, id, callback) => {
  db.query('INSERT INTO "matche" ("userId1", "userId2") VALUES ($1, $2)',
    [idUser, id],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, `ok ${res}`);
    });
};

//
// ─── DEL MATCHE ─────────────────────────────────────────────────────────────────
//
export const delMatche = (idUser, id, callback) => {
  db.query('DELETE FROM "matche" WHERE ("userId1" = $1 AND "userId2" = $2) OR ("userId1" = $2 AND "userId2" = $1)',
    [idUser, id],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, `ok ${res}`);
    });
};
