const express = require('express');
const { getAllSkills,getSkill,postNewSkill,putSkill,deleteSkill } = require('./skill.controller');

const SkillRoutes = express.Router();


//Podemos usar la misma ruta para distintos metodos, tanto POST, PUT, DELETE, GET pueden usar la misma ruta dado que son metodos distintos
SkillRoutes.get('/', getAllSkills);
SkillRoutes.get('/:id', getSkill);
SkillRoutes.post('/', postNewSkill);
SkillRoutes.put('/:id', putSkill);
SkillRoutes.delete('/:id', deleteSkill);

module.exports = SkillRoutes;