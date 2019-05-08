import uniqid from 'uniqid';
import { db } from '../../database';

export const getallusers = (callback) => {
  db.query('SELECT * FROM users ORDER BY iduser ASC', (err, res) => {
    if (err.error) { callback(err.error, null); }
    callback(null, res);
  });
};

export const adduser = (request, callback) => {
  const { mail, username, password, firstName, lastName } = request.body;
  const confirmkey = uniqid('confirmKey--');

  db.query('INSERT INTO users (mail, username, password, firstName, lastName, confirmkey) VALUES ($1, $2, $3, $4, $5, $6)',
    [mail, username, password, firstName, lastName, confirmkey], (err) => {
      if (err.error) {
        callback(err, null);
      }
      callback(null, confirmkey);
    });
};

export const checkkey = (confirmKey, callback) => {
  db.query('SELECT * FROM users WHERE confirmKey = $1', [confirmKey], (err, res) => {
    let data;
    if (err.error) {
      callback(err, null);
    }
    if (res[0] === undefined) {
      data = -1;
    } else {
      data = res[0].iduser;
    }
    callback(null, data);
  });
};

export const activeuser = (iduser, callback) => {
  db.query('SELECT * FROM users WHERE iduser = $1', [iduser], (err, res) => {
    if (err.error) {
      callback(err.error, null);
    }
    if (res[0].activate === true) {
      callback('User alrady activate', null);
    } else {
      db.query('UPDATE users SET activate=true WHERE iduser = $1', [iduser], (err2, res2) => {
        if (err2.error) {
          callback(err2.error, null);
        } else {
          callback(null, res2);
        }
      });
    }
  });
};

export const getuserbyMail = (mail, callback) => {
  db.query('SELECT * FROM users WHERE mail = $1', [mail], (err, res) => {
    if (err.error) {
      callback(err, null);
    }
    callback(null, res[0]);
  });
};

export const getuserbyIdUser = (iduser, callback) => {
  db.query('SELECT * FROM users WHERE iduser = $1', [iduser], (err, res) => {
    if (err.error) {
      callback(err, null);
    }
    callback(null, res[0]);
  });
};

export const getuserbyUsername = (username, callback) => {
  db.query('SELECT * FROM users WHERE username = $1', [username], (err, res) => {
    if (err.error) {
      callback(err, null);
    }
    callback(null, res[0]);
  });
};

export const deluser = (iduser, callback) => {
  db.query('DELETE FROM users WHERE iduser = $1', [iduser], (err, res) => {
    if (err.error) {
      callback(err, null);
    }
    callback(null, res);
  });
};


export const edituserMail = (request, callback) => {
  const { mail } = request.body;
  const { iduser } = request.user;

  if (mail) {
    db.query('UPDATE users SET mail = $1 WHERE iduser = $2',
      [mail, iduser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

export const edituserUsername = (request, callback) => {
  const { username } = request.body;
  const { iduser } = request.user;

  if (username) {
    db.query('UPDATE users SET username = $1 WHERE iduser = $2',
      [username, iduser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

export const edituserPassword = (request, callback) => {
  const { password } = request.body;
  const { iduser } = request.user;

  if (password) {
    db.query('UPDATE users SET password = $1 WHERE iduser = $2',
      [password, iduser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

export const edituserFirstName = (request, callback) => {
  const { firstName } = request.body;
  const { iduser } = request.user;

  if (firstName) {
    db.query('UPDATE users SET firstname = $1 WHERE iduser = $2',
      [firstName, iduser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

export const edituserLastName = (request, callback) => {
  const { lastName } = request.body;
  const { iduser } = request.user;

  if (lastName) {
    db.query('UPDATE users SET lastName = $1 WHERE iduser = $2',
      [lastName, iduser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

export const edituserBio = (request, callback) => {
  const { bio } = request.body;
  const { iduser } = request.user;

  if (bio) {
    db.query('UPDATE users SET bio = $1 WHERE iduser = $2',
      [bio, iduser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

export const edituserGenre = (request, callback) => {
  const { genre } = request.body;
  const { iduser } = request.user;

  if (genre && (genre === 'M' || genre === 'W' || genre === 'O')) {
    db.query('UPDATE users SET genre = $1 WHERE iduser = $2',
      [genre, iduser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

export const edituserOrientation = (request, callback) => {
  const { orientation } = request.body;
  const { iduser } = request.user;

  if (orientation && (orientation === 'M' || orientation === 'W' || orientation === 'BI')) {
    db.query('UPDATE users SET orientation = $1 WHERE iduser = $2',
      [orientation, iduser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};

export const edituserDateOfBirth = (request, callback) => {
  const { dateOfBirth } = request.body;
  const { iduser } = request.user;

  if (dateOfBirth) {
    db.query('UPDATE users SET dateOfBirth = $1 WHERE iduser = $2',
      [dateOfBirth, iduser],
      (err, res) => {
        if (err.error) {
          callback(err, null);
        }
        callback(null, res);
      });
  }
};
