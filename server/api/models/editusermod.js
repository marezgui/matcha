import { db } from '../../database';

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
