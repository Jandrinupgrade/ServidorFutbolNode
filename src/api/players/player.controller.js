const { deleteFile } = require('../../utils/middlewares/deleteFile.middleware');
const Player = require('./player.model');

//Obtenemos todos los jugadores
const getAllPlayers = async (req, res, next) => {
    try {
        const players = await Player.find().populate('skill');
        return res.status(200).json(players);
    } catch (error) {
        return next(error);
    }
}

//obtenemos un jugador por id
const getPlayer = async (req, res, next) => {
    try {
        const {id} = req.params;
        const player = await Player.findById(id).populate('skill');  //Populamos por skill para recibir los atributos de la habilidad
        if(!player){
            const error = new Error("No player found by this id");
            error.status = 404;
            return next(error);       
        }
        return res.status(200).json(player);
    } catch (error) {
        return next(error);
    }
}



const postNewPlayer = async (req, res, next) => {
    try {
        const newPlayer = new Player(req.body);   
        if(req.file){
            newPlayer.image = req.file.path;         //Comprobamos si req.file está seteado y si es así obtenemos el archivo y lo asignamos a la imagen
        }
        
        const playerDB = await newPlayer.save();  
        return res.status(201).json(playerDB);
    } catch (error) {
        return next(error);
    }
}


const putPlayer = async (req, res, next) => {
    try {
        const {id} = req.params;
        const putPlayer = new Player(req.body);
        putPlayer._id = id;
        if(req.file){
            putPlayer.image = req.file.path;         //Comprobamos si req.file está seteado y si es así obtenemos el archivo y lo asignamos a la imagen
        }
        const playerDB = await Player.findByIdAndUpdate(id, putPlayer);
        if(!playerDB){
            const error = new Error("No player found by this id");
            error.status = 404;
            return next(error);  
        }
        if(playerDB.image){
            deleteFile(playerDB.image);
        }
        return res.status(200).json(playerDB);
    } catch (error) {
        return next(error);
    }

}


const deletePlayer = async (req, res, next) => {
    try {
        const {id} = req.params;
        const playerDB = await Player.findByIdAndDelete(id);
        if(!playerDB){
            const error = new Error("No player found by this id");
            error.status = 404;
            return next(error);  
        }
        return res.status(200).json(playerDB);
    } catch (error) {
        return next(error);
    }
}


module.exports = {
    getAllPlayers,
    getPlayer,
    postNewPlayer,
    putPlayer,
    deletePlayer
}