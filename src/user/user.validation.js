import Joi from 'joi';

const register = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  name: Joi.string().max(100).required(),
});

const login = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

const get = Joi.string().max(100).required();

const update = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).optional(),
  name: Joi.string().max(100).optional(),
});

export default {
  register,
  login,
  get,
  update,
};
