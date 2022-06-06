const passport = require("passport");

const postRegister = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Falta campo email o password en tu formulario");
    error.status = 400;
    return next(error);
  }

  const done = (error, user) => {
    if (error) {
      return next(error);
    }

    req.logIn(user, (error) => {
      // loguea al usuario asignándole una sesión.
      if (error) {
        return next(error);
      }
      return res.status(201).json(user);
    });
  };

  passport.authenticate("registrito", done)(req);
};

const postLogin = (req, res, next) => {
  const done = (error, user) => {
    if (error) {
      return next(error);
    }

    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      return res.status(200).json(user);
    });
  };

  passport.authenticate("logincito", done)(req);
};

const postLogout = async (req, res, next) => {
  if (req.user) {
    // Destruimos el objeto req.user para este usuario
    await req.logout(() => {
        req.session.destroy(() => {
          // Eliminamos la cookie de sesión al cancelar la sesión y borramos de DB
          res.clearCookie("connect.sid");
          return res.status(200).json("Hasta pronto!!");
        });
    });

  } else {
    return res.sendStatus(304); // Si no hay usuario, no habremos cambiado nada
  }
};

module.exports = {
  postRegister,
  postLogin,
  postLogout,
};