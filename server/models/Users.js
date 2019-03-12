const db = require('../database');

class Users {
    static retrieveAll (callback) {
        db.query('SELECT * from users', (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (firstName, callback) {
        db.query('INSERT INTO users (firstName) VALUES ($1)', [firstName], (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }
}

module.exports = Users;