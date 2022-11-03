const Joi = require('joi')

const putInSchema = Joi.object({
    lastName : Joi.string().min(1).required(),
    name : Joi.string().min(1).required(),
    patronymic : Joi.string().min(1),
    email : Joi.string().email().required(),
    message : Joi.string().min(2).max(100)
});


module.exports = {
    putInSchema
}