import validate from '../helper/validation.js';
import dosenValidation from './dosen.validation.js';
import validateString from '../helper/validationString.js';
import prisma from '../application/database.js';
import ResponseError from '../helper/response.error.js';

const create = async (request) => {
  const dosen = validate(dosenValidation.create, request);

  const data = await prisma.dosen.count({
    where: {
      name: dosen.name,
    },
  });

  if (data === 1) {
    throw new ResponseError(400, 'Dosen already exist');
  }

  return prisma.dosen.create({
    data: {
      name: dosen.name,
      sinta_id: dosen.sintaId,
      university_id: dosen.universityId,
      prodi_id: dosen.prodiId,
    },
  });
};

const getAll = async () => prisma.dosen.findMany();

const get = async (request) => {
  const id = validate(validateString, request.id);

  const data = await prisma.dosen.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    throw new ResponseError(400, 'Dosen is not found');
  }

  return data;
};

const update = async (requestBody, requestParams) => {
  const id = validate(validateString, requestParams.id);
  const {
    name, sintaId, universityId, prodiId,
  } = requestBody;

  const data = await prisma.dosen.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    throw new ResponseError(400, 'Dosen is not found');
  }

  const isDataExist = await prisma.dosen.findFirst({
    where: {
      name,
    },
  });

  if (isDataExist) {
    throw new ResponseError(400, 'Dosen already exist');
  }

  return prisma.dosen.update({
    data: {
      name,
      sinta_id: sintaId,
      university_id: universityId,
      prodi_id: prodiId,
    },
    where: {
      id,
    },
  });
};

const destroy = async (request) => {
  const id = validate(validateString, request.id);

  const data = await prisma.dosen.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    throw new ResponseError(400, 'Dosen is not found');
  }

  return prisma.dosen.delete({
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