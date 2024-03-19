import validate from '../helper/validation.js';
import validateString from '../helper/validationString.js';
import prisma from '../application/database.js';
import ResponseError from '../helper/response.error.js';

const create = async (request) => {
  const name = validate(validateString, request);

  const data = await prisma.university.count({
    where: {
      name,
    },
  });

  if (data === 1) {
    throw new ResponseError(400, 'University already exist');
  }

  return prisma.university.create({
    data: {
      name,
    },
  });
};

const getAll = async () => prisma.university.findMany();

const get = async (request) => {
  const id = validate(validateString, request.id);

  const data = await prisma.university.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    throw new ResponseError(400, 'University is not found');
  }

  return data;
};

const update = async (requestBody, requestParams) => {
  const id = validate(validateString, requestParams.id);
  const { name } = requestBody;

  const data = await prisma.university.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    throw new ResponseError(400, 'University is not found');
  }

  const isDataExist = await prisma.university.findFirst({
    where: {
      name,
    },
  });

  if (isDataExist) {
    throw new ResponseError(400, 'University already exist');
  }

  return prisma.university.update({
    data: {
      name,
    },
    where: {
      id,
    },
  });
};

const destroy = async (request) => {
  const id = validate(validateString, request.id);

  const data = await prisma.university.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    throw new ResponseError(400, 'University is not found');
  }

  return prisma.university.delete({
    where: {
      id,
    },
  });
};

export default {
  create,
  getAll,
  get,
  update,
  destroy,
};
