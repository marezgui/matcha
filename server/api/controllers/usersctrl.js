import express from 'express'
import bcrypt from 'bcrypt'
import * as jwtUtils from '../utils/jwt.utils'
import * as mod from '../models/usersmod'
import util from 'util'
import jwt from 'jsonwebtoken'
//Passport pour le login/logout -> req.user
import passport from 'passport'
import * as op from '../utils/passport.utils'

// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;

// FONCTIONS

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
		return res.status(400).json({ 'error': 'missing parameters' });

	if (login.length >= 13 || login.length <= 4)
		return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12)' });

	if (!EMAIL_REGEX.test(mail))
		return res.status(400).json({ 'error': 'email is not valid' });

	if (!PASSWORD_REGEX.test(password))
		return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });

	const verifuser = util.promisify(mod.verifuser)
	const hash = util.promisify(bcrypt.hash)
	let resultuser = await verifuser(req)
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
	let goodkey = await checkkey(key)
							.then(data => {return data})
							.catch(err => { console.error(`[Error]: ${err}`)});
	if (goodkey === -1)
		return res.status(201).json({ "message" : "BAD KEY"})
	else {
		mod.activeuser(goodkey, res)
	}
}

export const getallusers = (req, res) => {
	mod.getallusers((err, success) => {
		return res.status(200).json({success})
	})
}

export const getuser = (req, res) => {
	const id = parseInt(req.params.id)
	mod.getuser(id, (err, success) => {
		return res.status(200).json({success})
	})
}

export const getme = (req, res) =>{
	return res.status(200).send(req.user)
}

export const login = async (req, res) => {
		if(req.body.mail && req.body.password){
		  var mail = req.body.mail;
		}
		else
			return res.status(401).json({message:"Empty form"});

		// usually this would be a database call:
		const getuserbymail = util.promisify(mod.getuserbymail)
		let user = await getuserbymail(mail)
									.then(data => {return data})
									.catch(err => { console.error(`[Error]: ${err}`)})

		const hashcmp = util.promisify(bcrypt.compare)
		let passwdcmp = await hashcmp(req.body.password, user.password)
									.then(data => {return data})
									.catch(err => { console.error(`[Error]: ${err}`)});
		console.log(passwdcmp)
		if (user.activate === false)
		{
			return res.status(209).json({ 'error': 'User not activate' });
		}
		if(passwdcmp === true) {
		  // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
		  var payload = {id: user.id};
		  var token = jwt.sign(payload, op.opts.secretOrKey );
		  res.json({message: "ok", token: token});
		} else {
		  res.status(401).json({message:"passwords did not match"});
		}
	}

	//	Utile que si on utlise les cookies
export const logout = (req, res) => {
	req.logout();
	res.redirect('/');
}

export const deluser = (req, res) => {
	mod.deluser(req.user.id, (err, success) => {
		return res.status(200).json({success})
	})
}

export const edituser = (req, res) => {
	mod.edituser(req, (err, success) => {
		return res.status(200).json({success})
	})
}

