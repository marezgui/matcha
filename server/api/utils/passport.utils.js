import passport from 'passport';
import passportJWT from 'passport-jwt';
import util from 'util';
import * as mod from '../models/usersmod';

const JwtStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

export const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETKEY;

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {

    const getuserbyIdUser = util.promisify(mod.getuserbyIdUser);

    const user = await getuserbyIdUser(jwtPayload.iduser)
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
