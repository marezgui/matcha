import { db } from '../database'

export default class Users {
    static getUser(login, callback) {
        db.query('SELECT * from users WHERE login=($1)', [login], (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }
    
    static addUser(data, callback) {
        
    }
}