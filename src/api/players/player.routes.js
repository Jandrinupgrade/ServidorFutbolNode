const express = require('express');
const { isAuthenticated } = require('../../utils/middlewares/auth.middleware');

const { getAllPlayers,getPlayer,postNewPlayer,putPlayer,deletePlayer } = require('./player.controller');
const upload = require('../../utils/middlewares/uploadFile.middleware');

const PlayerRoutes = express.Router();


//Podemos usar la misma ruta para distintos metodos, tanto POST, PUT, DELETE, GET pueden usar la misma ruta dado que son metodos distintos
PlayerRoutes.get('/', getAllPlayers);
PlayerRoutes.get('/:id', getPlayer);
PlayerRoutes.post('/', upload.single('image'), postNewPlayer);
// ('/', upload.fields([
//     { name: 'image', maxCount: 1 },             //nombre del campo y cantidad --> genera un array
//     { name: 'image2', maxCount: 1 }
//   ]), postNewCharacter);
PlayerRoutes.put('/:id',upload.single('image'), putPlayer);
PlayerRoutes.delete('/:id', deletePlayer);

module.exports = PlayerRoutes;