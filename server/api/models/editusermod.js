import { db } from '../../database';

//
// ─── EDIT USER MAIL ─────────────────────────────────────────────────────────────
//
export const edituserMail = (request, callback) => {
  const { mail } = request.body;
  const { idUser } = request.user;
  if (mail) {
    db.query('UPDATE "users" SET "mail" = $1 WHERE "idUser" = $2',
      [mail, idUser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

//
// ─── EDIT USERNAME ──────────────────────────────────────────────────────────────
//
export const edituserUsername = (request, callback) => {
  const { username } = request.body;
  const { idUser } = request.user;
  if (username) {
    db.query('UPDATE "users" SET "username" = $1 WHERE "idUser" = $2',
      [username, idUser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

//
// ─── EDIT USER PASSWORD ─────────────────────────────────────────────────────────
//
export const edituserPassword = (request, callback) => {
  const { password } = request.body;
  const { idUser } = request.user;
  if (password) {
    db.query('UPDATE "users" SET "password" = $1 WHERE "idUser" = $2',
      [password, idUser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

//
// ─── EDIT USER FIRST NAME ───────────────────────────────────────────────────────
//
export const edituserFirstName = (request, callback) => {
  const { firstName } = request.body;
  const { idUser } = request.user;
  if (firstName) {
    db.query('UPDATE "users" SET "firstName" = $1 WHERE "idUser" = $2',
      [firstName, idUser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

//
// ─── EDIT USER LAST NAME ────────────────────────────────────────────────────────
//
export const edituserLastName = (request, callback) => {
  const { lastName } = request.body;
  const { idUser } = request.user;
  if (lastName) {
    db.query('UPDATE "users" SET "lastName" = $1 WHERE "idUser" = $2',
      [lastName, idUser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

//
// ─── EDIT USER BIO ──────────────────────────────────────────────────────────────
//
export const edituserBio = (request, callback) => {
  const { bio } = request.body;
  const { idUser } = request.user;
  if (bio) {
    db.query('UPDATE "users" SET "bio" = $1 WHERE "idUser" = $2',
      [bio, idUser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

//
// ─── EDIT USER GENRE ────────────────────────────────────────────────────────────
//
export const edituserGenre = (request, callback) => {
  const { genre } = request.body;
  const { idUser } = request.user;
  if (genre && (genre === 'M' || genre === 'W' || genre === 'O')) {
    db.query('UPDATE "users" SET "genre" = $1 WHERE "idUser" = $2',
      [genre, idUser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

//
// ─── EDIT USER ORIENTATION ──────────────────────────────────────────────────────
//
export const edituserOrientation = (request, callback) => {
  const { orientation } = request.body;
  const { idUser } = request.user;
  if (orientation && (orientation === 'M' || orientation === 'W' || orientation === 'BI')) {
    db.query('UPDATE "users" SET "orientation" = $1 WHERE "idUser" = $2',
      [orientation, idUser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

//
// ─── EDIT USER DATE OF BIRTH ────────────────────────────────────────────────────
//
export const edituserDateOfBirth = (request, callback) => {
  const { dateOfBirth } = request.body;
  const { idUser } = request.user;
  if (dateOfBirth) {
    db.query('UPDATE "users" SET "dateOfBirth" = $1 WHERE "idUser" = $2',
      [dateOfBirth, idUser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

//
// ─── ADD TAG ────────────────────────────────────────────────────────────────────
//
export const addtag = (request, callback) => {
  const { tag } = request.body;
  const { idUser } = request.user;
  if (tag) {
    db.query('INSERT INTO "tag" ("tag", "userId") VALUES ($1, $2)',
      [tag, idUser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

//
// ─── REMOVE TAG ─────────────────────────────────────────────────────────────────
//
export const removetag = (request, callback) => {
  const { tag } = request.body;
  const { idUser } = request.user;
  if (tag) {
    db.query('DELETE FROM "tag" WHERE "tag" = $1 AND "userId" = $2',
      [tag, idUser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

//
// ─── EDIT USER LACATION ─────────────────────────────────────────────────────────
//
export const editLocation = (request, callback) => {
  const { location } = request.body;
  const { idUser } = request.user;
  db.query('UPDATE "users" SET "location" = $1 WHERE "idUser" = $2',
    [location, idUser],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, res);
    });
};

//
// ─── EDIT USER PHOTO JSON ───────────────────────────────────────────────────────
//
export const editPhoto = (request, callback) => {
  const { photo } = request.body;
  const { idUser } = request.user;
  db.query('UPDATE "users" SET "photo" = $1 WHERE "idUser" = $2',
    [photo, idUser],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, res);
    });
};

//
// ─── EDIT CONFIRM PROFIL ────────────────────────────────────────────────────────
//
export const editUserIsComplete = (id, state, callback) => {
  db.query('UPDATE "users" SET "userIsComplete" = $1 WHERE "idUser" = $2',
    [state, id],
    (err, res) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, res);
    });
};
