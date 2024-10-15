

const JWT = require('passport-jwt');
const User = require('../models/user.js');

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'twitter_secret'
}

const passportAuth = (passport) => {
    try {
        console.log("inside strategy");;
        passport.use(new JwtStrategy(opts, async(jwt_payload, done) => {
            console.log("req sent to strategy");
            const user = await User.findById(jwt_payload.id);
            if(!user) {
                done(null, false);
            } else {
                done(null, user);
            }
        }));
    } catch(err) {
        console.log(err);
        throw err;
    }
    
}


module.exports = passportAuth;