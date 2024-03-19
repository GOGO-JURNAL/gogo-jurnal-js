import Joi from 'joi';

const validateString = Joi.string().max(100).required();

export default validateString;
