const Joi = require("joi");

const UsersSchema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    email   : Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
})

module.exports = UsersSchema;
