import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().max(100).required(),
  sintaId: Joi.string().max(20).required(),
  universityId: Joi.string().max(100).required(),
  prodiId: Joi.string().max(100).required(),
});

export default {
  create,
};
