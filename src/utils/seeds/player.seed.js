const mongoose = require('mongoose');
const Player = require('../../api/players/player.model');
const {DB_URL} = require('../database/database');

const players = [
  {
    name: "Luka Modric",
    skill: 32,
   position: "Centrocampista",
    image: "frontal",
    speed: 87,
  },
  {
    name: "Vinicius",
    skill: 32,
   position: "Delantero",
    image: "frontal",
    speed: 96,
  },
  {
    name: "Toni Kross",
    skill: 32,
   position: "Centrocampista",
    image: "lateral",
    speed: 67,
  },
  {
    name: "Casemiro",
    skill:56 ,
   position: "Centrocampista",
    image: "frontal",
    speed: 76,
  },
  {
    name: "Benzema",
    skill: 55,
   position: "Delantero",
    image: "lateral",
    speed: 91,
  },
 
];


mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
      console.log('Ejecutando seed...');
      const players = await Player.find();
      
      if (players.length) {
        console.log('Eliminando colección...');
        await Player.collection.drop();
      } else {
        console.log('No hay jugadores en la base de datos... procediendo a añadir los nuevos');
      }
  })
  .catch(error => console.log('Error al borrar base de datos', error))
  .then(async() => {
    await Player.insertMany(players)
    console.log('Jugadores añadidos con éxito');
  })
  .catch(error => console.log('Error al insertar los jugadores', error))
  .finally(() => mongoose.disconnect())