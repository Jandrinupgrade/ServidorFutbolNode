const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cloudinary = require("cloudinary").v2;
require("./src/utils/auth/index");
dotenv.config();

const PlayerRoutes = require("./src/api/players/player.routes");
const SkillRoutes = require("./src/api/skill/skill.routes");
const UserRoutes = require("./src/api/users/user.routes");

const { connectDb } = require("./src/utils/database/database");

const PORT = process.env.PORT || 3737;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})



const app = express();
app.disable("x-powered-by");
connectDb();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE"); //Definimos los metodos que permitimos para nuestra API
  res.header("Access-Control-Allow-Credentials", "true"); //Decimos que permitos la conexion con credenciales(cookies, autenticacion, etc)
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(
  cors({
    //Definimos las rutas para las que damos permiso a acceder a nuestra API, para que no la bloquee el CORS
    origin: ["https://localhost:3000", "https://localhost:4200"], //Implementamos el cors para poder conectarnos desde los puertos estandar de ANGULAR Y REACT
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET, // ¡Este secreto tendremos que cambiarlo en producción!
    resave: false, // Solo guardará la sesión si hay cambios en ella.
    saveUninitialized: false, // Lo usaremos como false debido a que gestionamos nuestra sesión con Passport
    cookie: {
      maxAge: 60 * 60 * 1000, // Milisegundos de duración de nuestra cookie, en este caso será una hora.
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  express.json({
    limit: "5mb", //Limitamos el tamaño máximo de nuestra petición
  })
);

app.use(express.urlencoded({ limit: "5mb", extended: true })); //Se asegura que lo que recibas sean urls con clave--valor

app.use("/players", PlayerRoutes);
app.use("/skill", SkillRoutes);
app.use("/users", UserRoutes);



app.use("/", (req, res) => {
  return res.status(200).json("Mi api de football players");
});

app.use("*", (req, res, next) => {
  //Para las rutas que no estén definidas muestranos un Route not found
  return res.status(404).json("Route not found");
});

app.use((error, req, res, next) => {
  //Para cualquier error que suceda en la aplicación,CONTROLADOR DE ERRORES 
  return res.status(error.status || 500).json(error.message || "Unexpected error");
});

app.listen(PORT, () => {
  console.log(`listening in http://localhost:${PORT}`);
});