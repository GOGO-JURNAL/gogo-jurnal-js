import validate from '../helper/validation.js';
import dosenValidation from './dosen.validation.js';
import validateString from '../helper/validationString.js';
import prisma from '../application/database.js';
import ResponseError from '../helper/response.error.js';

const create = async (request, requestUser) => {
  const dosen = validate(dosenValidation.create, request);
  const { role } = requestUser;

  if (requestUser && role === 'ADMIN') {
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
  }

  throw new ResponseError(403, 'Forbidden!');
};

const getAll = async () => prisma.dosen.findMany({
  include: {
    Jurnal: true,
  },
  orderBy: {
    name: 'asc',
  },
});

const get = async (request) => {
  const id = validate(validateString, request.id);

  const data = await prisma.dosen.findUnique({
    where: {
      id,
    },
    include: {
      Jurnal: true,
    },
  });

  if (!data) {
    throw new ResponseError(400, 'Dosen is not found');
  }

  return data;
};

const update = async (requestBody, requestParams, requestUser) => {
  const id = validate(validateString, requestParams.id);
  const {
    name, sintaId, universityId, prodiId,
  } = requestBody;
  const { role } = requestUser;

  if (requestUser && role === 'ADMIN') {
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
  }

  throw new ResponseError(403, 'Forbidden!');
};

const destroy = async (request, requestUser) => {
  const id = validate(validateString, request.id);
  const { role } = requestUser;

  if (requestUser && role === 'ADMIN') {
    const data = await prisma.dosen.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      throw new ResponseError(400, 'Dosen is not found');
    }

    const journalData = await prisma.jurnal.count({
      where: {
        dosen_id: data.id,
      },
    });

    if (journalData > 1) {
      await prisma.jurnal.deleteMany({
        where: {
          dosen_id: data.id,
        },
      });
    }

    return prisma.dosen.delete({
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
