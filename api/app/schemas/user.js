const Joi = require('joi');

const newUserSchema = Joi.object({
    id: Joi.number().integer(),
    firstname: Joi.string().max(30).required(),
    lastname: Joi.string().max(30).required(),
    gender: Joi.string().alphanum().required(),
    email: Joi.string().max(30).email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    description: Joi.string().max(1800),
    age: Joi.number().max(124).min(18),
    city: Joi.string(),
    phone_number: Joi.string().pattern(new RegExp('^[+]{1}[-0-9.]{2,20}$|^[-0-9.]{1,20}$')).max(25),
    img_url: Joi.string().max(1500)
})

const updateUserSchema = Joi.object({
    id: Joi.number().integer(),
    firstname: Joi.string().max(30),
    lastname: Joi.string().max(30),
    gender: Joi.string().alphanum(),
    email: Joi.string().max(30).email(),
    description: Joi.string().max(1800),
    age: Joi.number().max(124).min(18),
    learningLanguage: Joi.array(),
    speakingLanguage: Joi.array(),
    city: Joi.string(),
    phone_number: Joi.string().pattern(new RegExp('^[+]{1}[-0-9.]{2,20}$|^[-0-9.]{1,20}$')).max(25),
    img_url: Joi.string().max(1500)
})

const updateUserSecuritySchema = Joi.object({
    id: Joi.number().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
})

module.exports = { newUserSchema, updateUserSchema, updateUserSecuritySchema }