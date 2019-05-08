import passport from 'passport';
import passportJWT from 'passport-jwt';
import util from 'util';
import * as mod from '../models/usersmod';

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
export const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETKEY;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const getuserbyid = util.promisify(mod.getuserbyid);
    const user = await getuserbyid(jwt_payload.id)
      .then(data => data)
      .catch((err) => { console.error(`[Error]: ${err}`); });
    if (user) {
      return done(null, user);
    }
    return done(null, false);
    //  or you could create a new account here

  })
);

export default passport;
