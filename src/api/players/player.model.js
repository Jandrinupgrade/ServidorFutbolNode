const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const playerSchema = new Schema({
    name: {type: String, required: true, trim: true},
    skill: {type: Schema.Types.ObjectId, required: true, ref: 'skill'},
    position: {type: String, required: false, trim: true}, 
    image: {type: String, required: false, trim: true},
    speed: {type: Number, required: false, trim: true}
},
{
    timestamps:true
})

const Player = mongoose.model('player', playerSchema);
module.exports = Player;