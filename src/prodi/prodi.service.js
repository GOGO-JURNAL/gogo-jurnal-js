import validate from '../helper/validation.js';
import validateString from '../helper/validationString.js';
import prisma from '../application/database.js';
import ResponseError from '../helper/response.error.js';

const create = async (request) => {
  const name = validate(validateString, request);

  const data = await prisma.prodi.count({
    where: {
      name,
    },
  });

  if (data === 1) {
    throw new ResponseError(400, 'Prodi already exist');
  }

  return prisma.prodi.create({
    data: {
      name,
    },
  });
};

const getAll = async () => prisma.prodi.findMany();

const get = async (request) => {
  const id = validate(validateString, request.id);

  const data = await prisma.prodi.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    throw new ResponseError(400, 'Prodi is not found');
  }

  return data;
};

const update = async (requestBody, requestParams) => {
  const id = validate(validateString, requestParams.id);
  const { name } = requestBody;

  const data = await prisma.prodi.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    throw new ResponseError(400, 'Prodi is not found');
  }
  const isDataExist = await prisma.prodi.findFirst({
    where: {
      name,
    },
  });

  if (isDataExist) {
    throw new ResponseError(400, 'Prodi already exist');
  }

  return prisma.prodi.update({
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

  const data = await prisma.prodi.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    throw new ResponseError(400, 'Prodi is not found');
  }

  return prisma.prodi.delete({
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
