const Skill = require('./skill.model');

// Obtenemos todos los skills
const getAllSkills = async (req, res, next) => {
    try {
        
        const skills = await Skill.find();
        return res.status(200).json(skills);
    } catch (error) {
        return next(error);
    }
}

//obtenemos un skill por id
const getSkill = async (req, res, next) => {
    try {
        const {id} = req.params;
        const skill = await Skill.findById(id);
        if(!skill){
            const error = new Error("No skill found by this id");
            error.status = 404;
            return next(error);       
        }
        return res.status(200).json(skill);
    } catch (error) {
        return next(error);
    }
}


//Creamos un nuevo skill
const postNewSkill = async (req, res, next) => {
    try {
        const newSkill = new Skill(req.body);   //Req.body coge los elementos del cuerpo del mensaje
        const skillDB = await newSkill.save();  //Guardamos el nuevo race en BBDD
        return res.status(201).json(skillDB);
    } catch (error) {
        return next(error);
    }
}

//Actualizamos un skill
const putSkill = async (req, res, next) => {
    try {
        const {id} = req.params;
        const putSkill = new Skill(req.body);
        putSkill._id = id;
        const skillDB = await Skill.findByIdAndUpdate(id, putSkill);
        if(!skillDB){
            const error = new Error("No skill found by this id");
            error.status = 404;
            return next(error);  
        }
        return res.status(200).json(skillDB);
    } catch (error) {
        return next(error);
    }

}

//Borramos un skill
const deleteSkill = async (req, res, next) => {
    try {
        const {id} = req.params;
        const skillDB = await Skill.findByIdAndDelete(id);
        if(!skillDB){
            const error = new Error("No skill found by this id");
            error.status = 404;
            return next(error);  
        }
        return res.status(200).json(skillDB);
    } catch (error) {
        return next(error);
    }
}


module.exports = {
    getAllSkills,
    getSkill,
    postNewSkill,
    putSkill,
    deleteSkill
}