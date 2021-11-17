const { string } = require('joi');
const Joi = require('joi');

const newEventSchema = Joi.object({
    id: Joi.number().integer(),
    title: Joi.string().max(80).required(),
    starting_date: Joi.string().required(),
    ending_date: Joi.string().required(),
    img_url: Joi.string().max(1500),
    places_left: Joi.number().min(0).max(6).required(),
    description: Joi.string().max(1800).required(),
    address: Joi.string(),
    city: Joi.string().required(),
    location : Joi.string().required(),
    zipCode: Joi.string().required(),
    country : Joi.string().required(),
    user_id: Joi.number().required(),
    eventLanguage: Joi.array(),
    tagId: Joi.array(),
})

const updateEventSchema = Joi.object({
    id: Joi.number().integer(),
    title: Joi.string().max(80),
    starting_date: Joi.string(),
    ending_date: Joi.string(),
    img_url: Joi.string().max(1500),
    places_left: Joi.number().min(0).max(6),
    description: Joi.string().max(1800),
    address: Joi.string(),
    city: Joi.string(),
    location : Joi.string(),
    zipCode: Joi.string(),
    country : Joi.string(),
    user_id: Joi.number(),
    eventLanguage: Joi.array(),
    tagId: Joi.array()
})

module.exports = { newEventSchema, updateEventSchema }