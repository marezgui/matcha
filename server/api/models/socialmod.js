import { db } from '../../database';

export const getUsersForMe = (user, count, start, callback) => {

  let genre = user.genre;
  let orientation = user.orientation;

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
