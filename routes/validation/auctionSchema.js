const Joi = require("joi");

const auctionSchema = Joi.object().keys({
    user: Joi.string().alphanum().required(),
    price: Joi.string().required(),
})

module.exports = UsersSchema;
