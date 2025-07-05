import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserRepository from "../repository/UserRepository.js";
import { createHash } from "../utils/index.js";
import { passwordValidation } from "../utils/index.js";
import { createToken } from "../helpers/token.helper.js";
import { ExtractJwt, Strategy as PassportStrategy } from "passport-jwt";

const { PORT, SECRET } = process.env;

passport.use(
    "register",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                if (!req.body.first_name || !req.body.last_name) { return done(null, null, { message: "Invalid Data!!!", statusCode: 400 }); };
                let userRepository = new UserRepository();
                let user = await userRepository.getUserByEmail({ email });
                if (user) { return done(null, null, { message: "Invalid Credentials!", statusCode: 401 }); };
                req.body.password = createHash(password);
                user = await userRepository.create(req.body);
                done(null, user); // primer parametro es si ocurre un error, el segundo son los datos del usuario que se guardan en req
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                let userRepository = new UserRepository();
                let user = await userRepository.getUserByEmail({ email });
                if (!user) { return done(null, null, { message: "Invalid Credentials!", statusCode: 401 }); };
                const verifyPassword = passwordValidation(password, user.password);
                if (!verifyPassword) { return done(null, null, { message: "Ivalid Credentials!", statusCode: 401 }); };
                //Creo el Token:
                const data = { user_id: user._id, email: user.email, role: user.role };
                const token = createToken(data);
                user.token = token;
                donde(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "current",
    new PassportStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
            secretOrKey: SECRET
        },
        async (data, done) => {
            try {
                const { user_id, email, role } = data;
                const userRepository = new UserRepository();
                const user = await userRepository.getBy({ _id: user_id, email, role });
                if (!user) { return done(null, null, { message: "Forbidden!", statusCode: 403 }); };
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "user",
    new PassportStrategy(
        { 
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
            secretOrKey: SECRET
        },
        async (data, done) => {
            try {
                const { user_id, email, role } = data;
                const userRepository = new UserRepository();
                const user = await userRepository.getBy({ _id: user_id, email, role });
                if (!user) { return done(null, null, { message: "Forbidden!", statusCode: 403 }); };
                donde(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "admin",
    new PassportStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
            secretOrKey: SECRET
        },
        async (data, done) => {
            try {
                const { user_id, email, role } = data;
                const userRepository = new UserRepository();
                const user = await userRepository.getBy({ _id: user_id, emial, role });
                if (!user) { return done(null, null, { message: "Forbidden!", statusCode: 403 }); };
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

export default passport;