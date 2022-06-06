const mongoose = require('mongoose');
const Skill = require('../../api/players/player.model');
const {DB_URL} = require('../database/database');

const skills = [
    {
        skill: "Rematador",
        description: "Capacidad alta de definición"
    },
    {
        skill: "Visionario",
        description: "Capacidad alta para dar el último pase"
    },
    {
        skill: "Desbordador",
        description: "Capacidad muy alta de desequilibrar al rival"
    },
    {
        skill: "Muro",
        description: "Capacidad alta de destruccion del juego y finalización de jugadas"
    },
   
];

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
      console.log('Ejecutando seed...');
      const skills = await Skill.find();
      
      if (skills.length) {
        console.log('Eliminando colección...');
        await Skill.collection.drop();
      } else {
        console.log('No hay jugadores en la base de datos... procediendo a añadir los nuevos');
      }
  })
  .catch(error => console.log('Error al borrar base de datos', error))
  .then(async() => {
    await Skill.insertMany(skills)
    console.log('Skills añadidas con éxito');
  })
  .catch(error => console.log('Error al insertar los jugadores', error))
  .finally(() => mongoose.disconnect())