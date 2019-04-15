import passport from 'passport'
import passportJWT from 'passport-jwt'
import * as mod from '../models/usersmod'
import util from 'util'

import dotenv from 'dotenv'
dotenv.load()

let JwtStrategy = passportJWT.Strategy
let ExtractJwt = passportJWT.ExtractJwt
export let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETKEY;

/*		Utile si on veux gerer les sessions

//	used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
   //	where is this user.id going? Are we supposed to access this anywhere?
});

//	used to deserialize the user
passport.deserializeUser(async (id, done) => {
	const getuserbyid = util.promisify(mod.getuserbyid)
	let user = await getuserbyid(id)
			.then(user => { return user})
			.catch(err => { console.error(`[Error]: ${err}`)})
	done(null, user)
});
*/

passport.use(
		new JwtStrategy(opts, async (jwt_payload, done) => {
		const getuserbyid = util.promisify(mod.getuserbyid)
		let user = await getuserbyid(jwt_payload.id)
									.then(data => {return data})
									.catch(err => { console.error(`[Error]: ${err}`)})
		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
			//	or you could create a new account here
		}
	})
);

export default passport