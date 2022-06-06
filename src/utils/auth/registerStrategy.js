const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../../api/users/user.model");
const { validateEmail, validatePassword } = require("../helps/validations");

const saltRounds = 9;

const registerStrategy = new LocalStrategy(
  {
    usernameField: "email", // nombre del campo que queremos usar del Schema
    passwordField: "password", // nombre del campo que queremos usar del Schema
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    /**
     * 1. Comprobamos que el user no existe
     *
     * Si cumple con todo lo anterior, registraremos al usuario.
     */
    try {
      const existingUser = await User.findOne({ email: email.toLowerCase() });

      if (existingUser) {
        const error = new Error("Los datos introducidos, email o contraseña no son correctos");
        error.status = 400;
        return done(error, null);
      }

      const validEmail = validateEmail(email);
      if (!validEmail) {
        const error = new Error("Los datos introducidos, email o contraseña no son correctos");
        error.status = 400;
        return done(error, null);
      }

      const validPassword = validatePassword(password);
      if (!validPassword) {
        const error = new Error("Los datos introducidos, email o contraseña no son correctos");
        error.status = 400;
        return done(error, null);
      }

      const hash = await bcrypt.hash(password, saltRounds);
      const user = new User({ ...req.body, email, password: hash });
      const userDB = await user.save();
      userDB.password = null;
      return done(null, userDB);
    } catch (error) {
      return done(error);
    }
  }
);
module.exports = registerStrategy;