// ##################################################
// Gestion des actions (requettes) de la table USERS
// ##################################################

const db = require('../database');

class Users {
    static getUser(login, callback) {
        db.query('SELECT * from users WHERE login=($1)', [login], (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static getUsers(callback){
        db.query()
    }





    /*
    static insert (firstName, callback) {
        db.query('INSERT INTO users (firstName) VALUES ($1)', [firstName], (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }
*/
}

module.exports = Users;