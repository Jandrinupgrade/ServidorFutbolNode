const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const skillSchema = new Schema({
    skill: {type: String, required: true, trim: true},
    description: {type: String, required: false, trim: true}
},
{
    timestamps:true
})

const Skill = mongoose.model('skill', skillSchema);
module.exports = Skill;