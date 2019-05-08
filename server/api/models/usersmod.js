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
