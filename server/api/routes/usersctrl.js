import express from 'express'
import bcrypt from 'bcrypt'
import * as jwtUtils from '../utils/jwt.utils'
import * as mod from '../models/usersmod'
import util from 'util'


// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;

// Routes
export const getallusers = (req, res) => {
		return mod.getallusers(req, res);
}


export const adduser = async (req, res) => {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var mail = req.body.mail;
	var login = req.body.login;
	var password = req.body.password;
	var bio = req.body.bio;
	var genre = req.body.genre;
	var dateOfBirth = req.body.dateOfBirth;
	var orientation = req.body.orientation;
//	var location  = req.body.location;
//	var photo = req.body.photo;

	if (!(mail || login || password || firstName || lastName
		|| bio || genre || dateOfBirth || orientation))
	{
		return res.status(400).json({ 'error': 'missing parameters' });
	}

	if (login.length >= 13 || login.length <= 4) {
		return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12)' });
	}

	if (!EMAIL_REGEX.test(mail)) {
		return res.status(400).json({ 'error': 'email is not valid' });
	}

	if (!PASSWORD_REGEX.test(password)) {
		return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
	}




	// Fuck j ai mis hyper longtemps a reussir a faire ce verifuser
	const verifuser = util.promisify(mod.verifuser)
	const hash = util.promisify(bcrypt.hash)

	let resultuser = await verifuser(req, res)
							.then(data => {return data})
							.catch(err => { console.error(`[Error]: ${err}`)});

	if (resultuser === 1)
		return res.status(201).json({ "message" : "USER EXIST"})
	else {
		req.body.password = await hash(password, 5)
									.then(data => {return data})
									.catch(err => { console.error(`[Error]: ${err}`)});
		return mod.adduser(req, res)
	}
}

export const confirmmail = async (req, res) => {
	const key = req.params.CONFIRMKEY
	const checkkey = util.promisify(mod.checkkey)

	let goodkey = await checkkey(key, res)
							.then(data => {return data})
							.catch(err => { console.error(`[Error]: ${err}`)});

	if (goodkey === -1)
		return res.status(201).json({ "message" : "BAD KEY"})
	else {
		mod.activeuser(goodkey, res)
	}
}

export const getuser = (req, res) => {
	res = mod.getuser(req, res)
}

export const login = async (req, res) => {
	var mail = req.body.mail;
	var password = req.body.password;

	if (!(mail || password))
	{
		return res.status(400).json({ 'error': 'missing parameters' });
	}
	const getuserbymail = util.promisify(mod.getuserbymail)
	let user = await getuserbymail(req, res)
								.then(data => {return data})
								.catch(err => { console.error(`[Error]: ${err}`)});
	if (user === undefined)
	{
		return res.status(209).json({ 'error': 'Unknow user' });
	}
	else if (user.activate === false)
	{
		return res.status(209).json({ 'error': 'User not activate' });
	}

	const hashcmp = util.promisify(bcrypt.compare)
	let passwdcmp = await hashcmp(password, user.password)
								.then(data => {return data})
								.catch(err => { console.error(`[Error]: ${err}`)});
	if (passwdcmp === false)
	{
		return res.status(209).json({ 'error': 'Bad password' });
	}
	else{
		return res.status(201).json({
			'userId': user.id,
			'token': jwtUtils.generatetoken_USER(user)
		  });
	}
}

export const getme = async (req, res) => {
	var mail = req.body.mail;
	var password = req.body.password;

	if (!(mail || password))
	{
		return res.status(400).json({ 'error': 'missing parameters' });
	}
	const getuserbymail = util.promisify(mod.getuserbymail)
	let user = await getuserbymail(req, res)
								.then(data => {return data})
								.catch(err => { console.error(`[Error]: ${err}`)});
	if (user === undefined)
	{
		return res.status(209).json({ 'error': 'Unknow user' });
	}
	else if (user.activate === false)
	{
		return res.status(209).json({ 'error': 'User not activate' });
	}

	const hashcmp = util.promisify(bcrypt.compare)
	let passwdcmp = await hashcmp(password, user.password)
								.then(data => {return data})
								.catch(err => { console.error(`[Error]: ${err}`)});
	if (passwdcmp === false)
	{
		return res.status(209).json({ 'error': 'Bad password' });
	}
	else{
		return res.status(201).json({
			'userId': user.id,
			'token': jwtUtils.generatetoken_USER(user)
		  });
	}
}

export const deluser = (req, res) => {
	res = mod.getallusers(req, res)
	JSON.parse(res)
	return res.status(201).json({
		res
	  });
}

export const edituser = (req, res) => {
	res = mod.getallusers(req, res)
	JSON.parse(res)
	return res.status(201).json({
		res
	  });
}



