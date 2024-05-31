import validate from '../helper/validation.js';
import validateString from '../helper/validationString.js';
import prisma from '../application/database.js';
import ResponseError from '../helper/response.error.js';

const create = async (request, requestUser) => {
  const name = validate(validateString, request.name);
  const { role } = requestUser;

  if (requestUser && role === 'ADMIN') {
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
  }

  throw new ResponseError(403, 'Forbidden!');
};

const getAll = async () => prisma.prodi.findMany({
  orderBy: {
    name: 'asc',
  },
});

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

const update = async (requestBody, requestParams, requestUser) => {
  const id = validate(validateString, requestParams.id);
  const { name } = requestBody;
  const { role } = requestUser;

  if (requestUser && role === 'ADMIN') {
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
  }

  throw new ResponseError(403, 'Forbidden!');
};

const destroy = async (request, requestUser) => {
  const id = validate(validateString, request.id);
  const { role } = requestUser;

  if (requestUser && role === 'ADMIN') {
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
  }

  throw new ResponseError(403, 'Forbidden!');
};

export default {
  create,
  getAll,
  get,
  update,
  destroy,
};
