import { db } from './../../database'
import uniqid from 'uniqid'

export const getallusers = (callback) => {
	db.query('SELECT * FROM users ORDER BY id ASC', (err, res) => {
		if (err.error)
			callback(err.error, null)
		callback(null, res)
	})
  }

export const verifuser = (request, callback) => {
	const { email } = request.body
	db.query('SELECT * FROM users WHERE mail = $1', [email], (err, res) => {
		var data
		if (err.error) {
			callback(err, null)
		}
		if (res[0] === undefined){
			data = 0
		}
		else{
			data = 1
		}
		callback(null, data)
	})
}

export const verifuserpseudo = (request, callback) => {
	const { login } = request.body
	db.query('SELECT * FROM users WHERE username = $1', [login], (err, res) => {
		var data
		if (err.error) {
			callback(err, null)
		}
		if (res[0] === undefined){
			data = 0
		}
		else{
			data = 1
		}
		callback(null, data)
	})
}

export	const adduser = (request, response) => {
		const { email, login, password, firstName, lastName,
				bio, genre, dateOfBirth, orientation } = request.body
		let confirmkey = uniqid("confirmmail-")

		db.query('INSERT INTO users (mail, login, password, firstName, lastName,\
										bio, genre, dateOfBirth, orientation, confirmkey) \
										VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'
					, [email, login, password, firstName, lastName,
						bio, genre, dateOfBirth, orientation, confirmkey], (err, res) => {
		if (err.error) {
			console.log(err)
		}
		response.status(200).json({ "message" : `User add to database`,
									"confirmkey" : confirmkey })

		})
	}


export const checkkey = (key, callback) => {
		db.query('SELECT * FROM users WHERE confirmkey = $1', [key], (err, res) => {
		var data
		if (err.error) {
			callback(err, null)
		}
		if (res[0] === undefined){
			data = -1
		}
		else{
			data = res[0].id
		}
		callback(null, data)
	})
}

export const activeuser = (id, response) => {
	db.query('SELECT * FROM users WHERE id = $1', [id], (err, res) => {
	if (err.error) {
		console.log(err)
	}
	if (res[0].activate === true)
	{
		response.status(200).json({ "message" : `User already activate`})
	}
	else{
		db.query('UPDATE users SET activate=true WHERE id = $1', [id], (err, res) => {
			if (err.error) {
				console.log(err)
			}
			else {
				response.status(200).json({ "message" : `User activate`})
			}
		})	}
})
}

export const getuser = (id, callback) => {
	db.query('SELECT * FROM users WHERE id = $1', [id], (err, res) => {
	if (err.error) {
		callback(err, null)
	}
	callback(null, res[0])
})
}

export const getuserbymail = (email, callback) => {
	db.query('SELECT * FROM users WHERE mail = $1', [email], (err, res) => {
	if (err.error) {
		callback(err, null)
	}
	callback(null, res[0])
})
}

export const getuserbyid = (id, callback) => {
	db.query('SELECT * FROM users WHERE id = $1', [id], (err, res) => {
	if (err.error) {
		callback(err, null)
	}
	callback(null, res[0])
})
}

export	const edituser = (request, callback) => {
		const { email, login, password, firstName, lastName,
		bio, genre, dateOfBirth, orientation } = request.body
		const id = parseInt(request.params.id)

		db.query('UPDATE users SET (mail, login, password, firstName, lastName,\
			bio, genre, dateOfBirth, orientation, confirmkey) \
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
		[email, login, password, firstName, lastName,
			bio, genre, dateOfBirth, orientation, confirmkey],

		(err, res) => {
			if (err.error) {
				callback(err, null)
			}
			callback(null, "User modified")
		}
	)
}

export	const deluser = (id, callback) => {
		db.query('DELETE FROM users WHERE id = $1', [id], (err, res) => {
		if (err.error) {
			callback(err, null)
		}
		callback(null, "ok")
		})
	}
