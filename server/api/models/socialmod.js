import { db } from '../../database';

export const getUsersForMe = (user, count, start, callback) => {

  let { genre, orientation } = user;

  if (genre === 'O') {
    genre = 'BI';
  }

  if (orientation === 'BI') {
    orientation = 'O';
  }

  db.query('SELECT * FROM "users" where "users"."orientation" = $1 AND "users"."genre" = $2 LIMIT $3 OFFSET $4',
    [genre, orientation, count, start],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, res);
    });
};

export const testUserId = (idUser, callback) => {
  db.query('SELECT * FROM "users" WHERE "idUser" = $1', [idUser], (err, res) => {
    if (err.error) {
      callback(err, null);
    }
    if (res[0]) {
      callback(null, true);
    }
    callback(null, false);
  });
};

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

export const getUserBlocked = (idUser, id, callback) => {
  db.query('SELECT "blocked" FROM "blocked" WHERE "userId" = $1 AND "blockedUserId" = $2',
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
